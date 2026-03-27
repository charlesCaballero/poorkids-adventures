import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Maximize2, X, RotateCw, ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";

interface GalleryImage {
  url: string;
  category: string;
  id: string;
}

// Simple cache to persist images across navigation within the same session
let galleryCache: { images: GalleryImage[], categories: string[] } | null = null;

export default function Gallery() {
  const [allImages, setAllImages] = useState<GalleryImage[]>(galleryCache?.images || []);
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(galleryCache?.categories || ["All Stories"]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!galleryCache);
  const [rotations, setRotations] = useState<Record<string, number>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Load saved rotations from localStorage
    const saved = localStorage.getItem("gallery_rotations");
    if (saved) {
      try {
        setRotations(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved rotations");
      }
    }

    // If we have cached data, we don't need to fetch again
    if (galleryCache) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch("/api/gallery")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch gallery images");
        return res.json();
      })
      .then(data => {
        if (data.images) {
          const uniqueCategories = Array.from(new Set(data.images.map((img: GalleryImage) => img.category))) as string[];
          const cats = ["All Stories", ...uniqueCategories.sort()];
          
          setAllImages(data.images);
          setCategories(cats);
          
          // Update cache
          galleryCache = { images: data.images, categories: cats };
        }
      })
      .catch(err => {
        console.error("Failed to fetch gallery images:", err);
        setError("Please ensure GOOGLE_API_KEY and GOOGLE_DRIVE_FOLDER_ID are set in the environment variables.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "All Stories": allImages.length
    };
    allImages.forEach(img => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, [allImages]);

  const saveRotations = useCallback((newRotations: Record<string, number>) => {
    setRotations(newRotations);
    localStorage.setItem("gallery_rotations", JSON.stringify(newRotations));
  }, []);

  const handleRotate = (url: string) => {
    const current = rotations[url] || 0;
    const next = (current + 90) % 360;
    saveRotations({ ...rotations, [url]: next });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter images based on active category
  const filteredImages = allImages.filter(img => {
    if (activeCategory === "All Stories") return true;
    return img.category === activeCategory;
  });

  const displayedImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto pb-24">
      <header className="mb-24 text-center">
        <div>
          <span className="font-bold text-sm uppercase tracking-[0.2em] text-secondary mb-4 block">The Visual Journal</span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface mb-6 tracking-tight">Captured Moments.</h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">
            A collective scrapbook of our travels. These are the views, streets, and stories shared by a bunch of broke but adventurous explorers.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(12); // Reset count when switching categories
            }}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              activeCategory === cat 
                ? "bg-primary text-on-primary" 
                : "bg-surface-container text-on-surface-variant hover:bg-secondary-container hover:text-secondary"
            }`}
          >
            {cat}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeCategory === cat ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            }`}>
              {categoryCounts[cat] || 0}
            </span>
          </button>
        ))}
      </div>

      {error ? (
        <div className="text-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20 px-6">
          <p className="text-red-500 text-xl font-bold mb-4">Configuration Required</p>
          <p className="text-on-surface-variant max-w-md mx-auto">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-on-surface-variant font-medium animate-pulse">Unpacking memories...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-on-surface-variant text-xl italic">No memories found in this category yet. Time for a new adventure?</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayedImages.map((img, i) => (
            <motion.div 
              key={img.url}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`relative overflow-hidden rounded-xl bg-surface-container shadow-sm transition-transform ${
                i % 3 === 0 ? "rotate-[-1deg]" : i % 3 === 1 ? "rotate-[1deg]" : ""
              }`}
            >
              <div className="relative aspect-auto">
                <img 
                  src={img.url} 
                  alt={`Gallery item ${i}`} 
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500"
                  style={{ transform: `rotate(${rotations[img.url] || 0}deg)` }}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/gallery/800/1200";
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 group">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedImage(img.url)}
                      className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white/40 transition-all"
                    >
                      <Maximize2 size={16} />
                      View Full
                    </button>
                    <button 
                      onClick={() => handleRotate(img.url)}
                      className="bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 rounded-full hover:bg-white/40 transition-all"
                      title="Rotate 90°"
                    >
                      <RotateCw size={18} />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-headline font-bold text-lg">
                      {activeCategory === "All Stories" ? img.category : activeCategory} #{i + 1}
                    </p>
                    <p className="text-white/70 text-xs uppercase tracking-widest">Digital Scrapbook</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              alt="Full size view" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-500"
              style={{ transform: `rotate(${rotations[selectedImage] || 0}deg)` }}
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <div className="mt-24 text-center">
          <button 
            onClick={loadMore}
            className="inline-flex items-center gap-3 px-10 py-4 bg-surface-container text-primary font-headline font-bold text-lg rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            Load More Memories
            <ChevronDown size={24} />
          </button>
        </div>
      )}

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-on-primary rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
            title="Back to Top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
