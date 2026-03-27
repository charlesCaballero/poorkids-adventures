import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, Calendar, Tag } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/blogs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch blog content");
        return res.text();
      })
      .then(html => {
        // Clean up the HTML from Google Docs
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 1. Extract rotation information from the <style> tags
        const rotationMap: Record<string, string> = {};
        const styleTags = doc.querySelectorAll('style');
        styleTags.forEach(styleTag => {
          const css = styleTag.textContent || '';
          // Match class names and their transform:rotate properties
          // Example: .c1{transform:rotate(1.57rad);...}
          const matches = css.matchAll(/\.([a-z0-9-]+)\{[^}]*transform:[^;]*rotate\(([^)]+)\)/gi);
          for (const match of matches) {
            rotationMap[match[1]] = `rotate(${match[2]})`;
          }
        });

        // 2. Apply rotations to elements and clean up
        const allElements = doc.querySelectorAll('*');
        allElements.forEach(el => {
          let rotation = '';
          
          // Check classes for rotation
          el.classList.forEach(cls => {
            if (rotationMap[cls]) rotation = rotationMap[cls];
          });

          // Check inline style for rotation
          const inlineStyle = el.getAttribute('style');
          if (inlineStyle) {
            const rotateMatch = inlineStyle.match(/transform:[^;]*rotate\([^)]+\)/);
            if (rotateMatch) {
              rotation = rotateMatch[0].replace('transform:', '').trim();
            }
          }

          // Strip all attributes except essential ones
          const attrs = Array.from(el.attributes);
          attrs.forEach(attr => {
            if (!['src', 'href', 'alt', 'colspan', 'rowspan'].includes(attr.name)) {
              el.removeAttribute(attr.name);
            }
          });

          // Re-apply rotation if found
          if (rotation) {
            el.setAttribute('style', `transform: ${rotation}; display: inline-block;`);
          }
          
          // Remove empty spans
          if (el.tagName === 'SPAN' && !el.textContent?.trim() && !el.children.length) {
            el.remove();
          }
        });

        setContent(doc.body.innerHTML);
      })
      .catch(err => {
        console.error("Error fetching blog:", err);
        setError("Could not load the journal entry. Please ensure the Google Doc is shared correctly.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-on-surface-variant font-medium animate-pulse font-headline">Opening the field journal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-40 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-red-500/10 p-8 rounded-2xl border border-red-500/20">
          <h2 className="text-red-500 text-2xl font-black mb-4 font-headline">Entry Restricted</h2>
          <p className="text-on-surface-variant mb-8">{error}</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            <ArrowLeft size={20} /> Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <Link to="/blog" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> 
        Back to Field Journal
      </Link>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container rounded-3xl p-8 md:p-16 shadow-sm border border-on-surface-variant/5"
      >
        <div 
          className="prose prose-lg prose-stone max-w-none 
            prose-headings:font-headline prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-on-surface
            prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:font-body
            prose-strong:text-on-surface prose-strong:font-black
            prose-li:text-on-surface-variant prose-li:font-body
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:mx-auto prose-img:my-12
            prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:italic prose-blockquote:bg-surface/50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl
            google-doc-content"
          dangerouslySetInnerHTML={{ __html: content || "" }} 
        />
      </motion.article>

      <style dangerouslySetInnerHTML={{ __html: `
        .google-doc-content {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
        .google-doc-content h1 { font-size: 2.5rem; margin-bottom: 1.5rem; line-height: 1.1; }
        .google-doc-content h2 { font-size: 1.75rem; margin-top: 2.5rem; margin-bottom: 1.25rem; }
        .google-doc-content h3 { font-size: 1.25rem; margin-top: 2rem; margin-bottom: 1rem; }
        
        @media (min-width: 768px) {
          .google-doc-content h1 { font-size: 3.5rem; margin-bottom: 2rem; }
          .google-doc-content h2 { font-size: 2.25rem; margin-top: 3rem; margin-bottom: 1.5rem; }
          .google-doc-content h3 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; }
        }
        
        .google-doc-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 3rem auto;
          border-radius: 1.5rem;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
        
        .google-doc-content ul, .google-doc-content ol {
          margin-left: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .google-doc-content li {
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }

        .google-doc-content table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 3rem 0;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 1rem;
          overflow: hidden;
        }
        
        .google-doc-content td {
          padding: 1rem;
          border: 1px solid rgba(0,0,0,0.05);
          background: rgba(255,255,255,0.3);
        }

        /* Scrapbook touches */
        .google-doc-content hr {
          border: none;
          height: 2px;
          background: repeating-linear-gradient(90deg, #9e3d00, #9e3d00 10px, transparent 10px, transparent 20px);
          margin: 4rem 0;
          opacity: 0.3;
        }
      `}} />
    </div>
  );
}
