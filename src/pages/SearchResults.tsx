import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Search, Loader2, ArrowRight, Camera, FileText, XCircle } from "lucide-react";

interface SearchItem {
  id: string;
  title: string;
  type: 'blog' | 'gallery';
  category: string;
  thumbnail?: string;
  date?: string;
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [blogRes, galleryRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/gallery")
        ]);

        const blogData = await blogRes.json();
        const galleryData = await galleryRes.json();

        const blogs: SearchItem[] = (blogData.blogs || []).map((b: any) => ({
          id: b.id,
          title: b.title,
          type: 'blog',
          category: b.category,
          thumbnail: b.thumbnail,
          date: b.date
        }));

        const gallery: SearchItem[] = (galleryData.images || []).map((img: any) => ({
          id: img.id,
          title: `${img.category} Photo`,
          type: 'gallery',
          category: img.category,
          thumbnail: img.url
        }));

        const allItems = [...blogs, ...gallery];
        const filtered = allItems.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchAll();
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Search size={32} />
          </div>
          <h1 className="font-headline font-black text-4xl md:text-6xl text-on-surface tracking-tight">
            Search Results
          </h1>
        </div>
        <p className="text-xl text-on-surface-variant">
          Showing results for <span className="text-primary font-bold italic">"{query}"</span>
        </p>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-on-surface-variant font-medium animate-pulse font-headline">Searching the archives...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((item, i) => (
            <motion.div
              key={`${item.type}-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="group bg-surface-container rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-on-surface-variant/5"
            >
              <Link to={item.type === 'blog' ? `/blog/${item.id}` : '/gallery'}>
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={item.thumbnail || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-on-surface font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                      {item.type === 'blog' ? <FileText size={10} /> : <Camera size={10} />}
                      {item.type}
                    </span>
                    <span className="bg-primary text-on-primary font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.date && (
                    <p className="text-on-surface-variant text-sm mb-4">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-primary font-headline font-black uppercase text-xs tracking-widest">
                    View {item.type === 'blog' ? 'Journal' : 'Gallery'} <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-surface-container rounded-[3rem] border-2 border-dashed border-on-surface-variant/20">
          <XCircle className="w-16 h-16 text-on-surface-variant/40 mx-auto mb-6" />
          <h2 className="font-headline font-bold text-3xl text-on-surface mb-4">No results found</h2>
          <p className="text-on-surface-variant max-w-md mx-auto mb-8">
            We couldn't find anything matching your search. Try different keywords or browse our categories.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/blog" className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Browse Journal
            </Link>
            <Link to="/gallery" className="bg-surface text-on-surface px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform border border-on-surface-variant/20">
              View Gallery
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
