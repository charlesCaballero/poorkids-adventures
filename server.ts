import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "PoorKids Adventures API is live" });
  });

  // Gallery API: List images from Google Drive
  app.get("/api/gallery", async (req, res) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!apiKey || !rootFolderId) {
      console.error("Google Drive API key or Folder ID missing");
      return res.status(500).json({ error: "Google Drive configuration missing" });
    }

    try {
      // 1. Fetch subfolders (categories)
      const folderUrl = `https://www.googleapis.com/drive/v3/files?q='${rootFolderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&key=${apiKey}`;
      const folderRes = await fetch(folderUrl);
      const folderData = await folderRes.json();

      if (!folderData.files) {
        return res.json({ images: [] });
      }

      const allImages: { id: string; url: string; category: string }[] = [];

      // 2. For each subfolder, fetch images
      for (const folder of folderData.files) {
        const fileUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+mimeType+contains+'image/'+and+trashed=false&fields=files(id,name,webContentLink)&key=${apiKey}`;
        const fileRes = await fetch(fileUrl);
        const fileData = await fileRes.json();

        if (fileData.files) {
          fileData.files.forEach((file: any) => {
            // Use the thumbnail link with a large size for better performance/quality balance
            // Or use the direct download link (webContentLink)
            // Thumbnail link format: https://drive.google.com/thumbnail?id={id}&sz=w1000
            allImages.push({
              id: file.id,
              url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`,
              category: folder.name
            });
          });
        }
      }

      res.json({ images: allImages });
    } catch (err) {
      console.error("Failed to fetch from Google Drive:", err);
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  // Blog API: List blog posts from Google Drive
  app.get("/api/blogs", async (req, res) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const rootFolderId = process.env.GOOGLE_BLOGS_FOLDER_ID;

    if (!apiKey || !rootFolderId) {
      console.error("Google Drive API key or Blogs Folder ID missing");
      return res.status(500).json({ error: "Google Drive configuration missing" });
    }

    try {
      // 1. Fetch subfolders (categories)
      const folderUrl = `https://www.googleapis.com/drive/v3/files?q='${rootFolderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&key=${apiKey}`;
      const folderRes = await fetch(folderUrl);
      const folderData = await folderRes.json();

      if (!folderData.files) {
        return res.json({ blogs: [] });
      }

      const allBlogs: any[] = [];

      // 2. For each subfolder, fetch Google Docs
      for (const folder of folderData.files) {
        const fileUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+mimeType='application/vnd.google-apps.document'+and+trashed=false&fields=files(id,name,createdTime,thumbnailLink)&key=${apiKey}`;
        const fileRes = await fetch(fileUrl);
        const fileData = await fileRes.json();

        if (fileData.files) {
          // Process each file to find the first image inside the document
          const blogPromises = fileData.files.map(async (file: any) => {
            let thumbnail = file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+$/, "=s1000") : null;

            try {
              // Attempt to fetch the document content to extract the first image
              const exportUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/html&key=${apiKey}`;
              const exportRes = await fetch(exportUrl);
              
              if (exportRes.ok) {
                const html = await exportRes.text();
                // Regex to find the first image tag's src
                const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                  thumbnail = imgMatch[1];
                }
              }
            } catch (e) {
              console.warn(`Could not extract image for blog ${file.id}:`, e);
            }

            return {
              id: file.id,
              title: file.name,
              category: folder.name,
              date: file.createdTime,
              thumbnail
            };
          });

          const folderBlogs = await Promise.all(blogPromises);
          allBlogs.push(...folderBlogs);
        }
      }

      // Sort by date descending
      allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      res.json({ blogs: allBlogs });
    } catch (err) {
      console.error("Failed to fetch blogs from Google Drive:", err);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Blog Content API: Fetch full content of a Google Doc
  app.get("/api/blogs/:id", async (req, res) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const { id } = req.params;

    if (!apiKey) {
      return res.status(500).json({ error: "Google Drive API key missing" });
    }

    try {
      const exportUrl = `https://www.googleapis.com/drive/v3/files/${id}/export?mimeType=text/html&key=${apiKey}`;
      const response = await fetch(exportUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to export document: ${response.statusText}`);
      }

      const html = await response.text();
      res.send(html);
    } catch (err) {
      console.error("Failed to fetch blog content:", err);
      res.status(500).json({ error: "Failed to fetch blog content" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
