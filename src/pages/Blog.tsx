import { motion } from "motion/react";
import { ArrowRight, MapPin, Plane, Hotel, Mail, Loader2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string | null;
  rotation?: number;
}

// Simple cache to persist blogs across navigation
let blogsCache: { blogs: BlogPost[], categories: string[] } | null = null;

export default function Blog() {
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(blogsCache?.blogs || []);
  const [activeCategory, setActiveCategory] = useState("All Entries");
  const [categories, setCategories] = useState<string[]>(blogsCache?.categories || ["All Entries"]);
  const [isLoading, setIsLoading] = useState(!blogsCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blogsCache) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch("/api/blogs")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then(data => {
        if (data.blogs) {
          const uniqueCategories = Array.from(new Set(data.blogs.map((b: BlogPost) => b.category))) as string[];
          const cats = ["All Entries", ...uniqueCategories.sort()];
          
          setAllBlogs(data.blogs);
          setCategories(cats);
          blogsCache = { blogs: data.blogs, categories: cats };
        }
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setError("Please ensure GOOGLE_BLOGS_FOLDER_ID is set in the environment variables.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All Entries") return allBlogs;
    return allBlogs.filter(b => b.category === activeCategory);
  }, [allBlogs, activeCategory]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-bold text-primary tracking-widest uppercase text-xs mb-4 block">Digital Field Journal</span>
            <h1 className="font-headline text-6xl md:text-8xl font-black text-on-surface tracking-tighter leading-none mb-6">
              Stories from the <span className="text-primary italic">Road.</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md">
              A raw collection of intentional travel, late-night street food, and the beauty found in being beautifully lost.
            </p>
          </div>
          <div className="p-4 bg-surface-container rounded-xl scrapbook-rotate-right shadow-sm border border-on-surface-variant/10">
            <div className="flex items-center gap-2 text-secondary font-bold">
              <MapPin size={18} />
              <span className="text-sm">Next Stop: Tokyo</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap gap-3 mb-16">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 ${
              activeCategory === cat ? "bg-primary text-on-primary" : "bg-secondary-container text-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error ? (
        <div className="text-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20 px-6">
          <p className="text-red-500 text-xl font-bold mb-4 font-headline">Journal Access Denied</p>
          <p className="text-on-surface-variant max-w-md mx-auto">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-on-surface-variant font-medium animate-pulse font-headline">Loading field notes...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-on-surface-variant text-xl italic font-headline">The journal is empty for this category. Time to write a new story?</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Post (First one) */}
          {filteredBlogs[0] && (
            <article className="md:col-span-8 group">
              <Link to={`/blog/${filteredBlogs[0].id}`}>
                <motion.div 
                  whileHover={{ rotate: 0 }}
                  className="relative mb-8 overflow-hidden rounded-xl scrapbook-rotate-left transition-transform duration-500"
                >
                  <img 
                    src={filteredBlogs[0].thumbnail || "https://picsum.photos/seed/travel/1200/800"} 
                    className="w-full aspect-[16/9] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                    style={filteredBlogs[0].rotation ? { transform: `rotate(${filteredBlogs[0].rotation}deg)` } : {}}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-secondary">{filteredBlogs[0].category}</span>
                  </div>
                </motion.div>
                <div className="max-w-2xl">
                  <time className="text-sm text-on-surface-variant font-semibold mb-2 block">{formatDate(filteredBlogs[0].date)}</time>
                  <h2 className="font-headline text-4xl font-extrabold group-hover:text-primary transition-colors mb-4">{filteredBlogs[0].title}</h2>
                  <button className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all">
                    Read Journal Entry <ArrowRight size={20} />
                  </button>
                </div>
              </Link>
            </article>
          )}

          {/* Sidebar (Rest of the blogs) */}
          <aside className="md:col-span-4 flex flex-col gap-12">
            {filteredBlogs.slice(1, 4).map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
                <article>
                  <div className="relative mb-4 overflow-hidden rounded-lg scrapbook-rotate-right transition-transform duration-500 hover:rotate-0">
                    <img 
                      src={blog.thumbnail || "https://picsum.photos/seed/travel/600/600"} 
                      className="w-full aspect-square object-cover rounded-lg"
                      style={blog.rotation ? { transform: `rotate(${blog.rotation}deg)` } : {}}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <time className="text-xs text-on-surface-variant font-semibold mb-1 block">{formatDate(blog.date)}</time>
                  <h3 className="font-headline text-xl font-bold group-hover:text-primary transition-colors">{blog.title}</h3>
                  <div className="mt-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-tertiary-container text-on-surface rounded">{blog.category}</span>
                  </div>
                </article>
              </Link>
            ))}

            <div className="p-8 bg-surface-container rounded-2xl border-2 border-dashed border-on-surface-variant/30 flex flex-col gap-4">
              <h4 className="font-headline text-lg font-bold">Planned Itinerary</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Plane size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-bold">Tokyo & Kyoto</p>
                    <p className="text-xs text-on-surface-variant">Coming April 2024</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <Hotel size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-bold">Osaka Backstreets</p>
                    <p className="text-xs text-on-surface-variant">Seeking Local Guides</p>
                  </div>
                </li>
              </ul>
              <button className="mt-4 w-full py-3 bg-on-surface text-surface rounded-xl font-bold text-sm hover:bg-primary transition-colors">
                Follow the Prep
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Bottom Grid for older posts */}
      {!isLoading && filteredBlogs.length > 4 && (
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredBlogs.slice(4).map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
              <article>
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={blog.thumbnail || "https://picsum.photos/seed/travel/800/600"} 
                    className="w-full aspect-[4/3] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    style={blog.rotation ? { transform: `rotate(${blog.rotation}deg)` } : {}}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <time className="text-sm text-on-surface-variant mb-2 block">{formatDate(blog.date)}</time>
                <h3 className="font-headline text-2xl font-extrabold mb-3">{blog.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary group-hover:underline">Read Journal</span>
              </article>
            </Link>
          ))}
          
          <div className="bg-primary-container p-8 rounded-xl flex flex-col justify-center aspect-[4/3]">
            <Mail size={40} className="text-on-surface mb-4" />
            <h3 className="font-headline text-2xl font-extrabold mb-2">Want the Full Log?</h3>
            <p className="text-on-surface-variant text-sm mb-6">Our raw, unedited travel notes are delivered weekly to our inner circle.</p>
            <input className="bg-white/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary mb-3" placeholder="Email Address" />
            <button className="bg-on-surface text-surface py-3 rounded-lg font-bold text-sm">Join the Newsletter</button>
          </div>
        </section>
      )}
    </div>
  );
}
