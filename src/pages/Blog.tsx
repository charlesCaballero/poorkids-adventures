import { motion } from "motion/react";
import { ArrowRight, MapPin, Plane, Hotel, Loader2, Calendar, RotateCcw, Globe } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Skeleton";

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
  const [viewAll, setViewAll] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    let blogs = activeCategory === "All Entries"
      ? allBlogs
      : allBlogs.filter(b => b.category === activeCategory);

    if (search) {
      blogs = blogs.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (startDate) {
      const start = new Date(startDate).getTime();
      blogs = blogs.filter(b => new Date(b.date).getTime() >= start);
    }

    if (endDate) {
      const end = new Date(endDate).getTime();
      blogs = blogs.filter(b => new Date(b.date).getTime() <= end);
    }

    return [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allBlogs, activeCategory, search, startDate, endDate]);

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
        </div>
      </header>

      {viewAll && (
        <div className="mb-16 space-y-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setViewAll(false)}
              className="px-4 py-2 rounded-full font-bold text-xs transition-all bg-secondary-container text-secondary hover:bg-primary hover:text-on-primary"
            >
              Highlights
            </button>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${
                  activeCategory === cat ? "bg-primary text-on-primary" : "bg-secondary-container text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-surface-container/50 p-6 rounded-2xl">
            <div className="flex-1 relative w-full max-w-md">
              <input 
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/50 text-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-primary" />
                <span className="text-sm font-bold text-on-surface-variant">Filter by Date:</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-surface-container px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-on-surface-variant">to</span>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-surface-container px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {(search || activeCategory !== "All Entries" || startDate || endDate) && (
              <button 
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All Entries");
                  setStartDate("");
                  setEndDate("");
                }}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                <RotateCcw size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {error ? (
        <div className="text-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20 px-6">
          <p className="text-red-500 text-xl font-bold mb-4 font-headline">Journal Access Denied</p>
          <p className="text-on-surface-variant max-w-md mx-auto">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="space-y-12">
          {viewAll ? (
            <div className="flex flex-col gap-12">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 items-start">
                  <Skeleton className="w-full md:w-72 aspect-[4/3] rounded-xl" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-8 flex flex-col gap-12">
                <Skeleton className="w-full aspect-[16/9] rounded-xl" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-12 w-3/4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <Skeleton className="aspect-[4/3] rounded-xl" />
                  <Skeleton className="aspect-[4/3] rounded-xl" />
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-12">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-12 w-full rounded-2xl" />
              </div>
            </div>
          )}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-on-surface-variant text-xl italic font-headline">The journal is empty for this category. Time to write a new story?</p>
        </div>
      ) : viewAll ? (
        /* LIST VIEW */
        <div className="flex flex-col gap-12">
          {filteredBlogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
              <article className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-72 aspect-[4/3] overflow-hidden rounded-xl">
                  <img 
                    src={blog.thumbnail || "https://picsum.photos/seed/travel/600/400"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-tertiary-container text-on-surface rounded">{blog.category}</span>
                    <time className="text-sm text-on-surface-variant font-semibold">{formatDate(blog.date)}</time>
                  </div>
                  <h2 className="font-headline text-3xl font-extrabold group-hover:text-primary transition-colors mb-4">{blog.title}</h2>
                  <p className="text-on-surface-variant line-clamp-2 mb-4">
                    Click to read the full journal entry from this adventure in {blog.category}.
                  </p>
                  <button className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all">
                    Read Entry <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        /* HIGHLIGHT LAYOUT */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column (Featured + 2 Below) */}
          <div className="md:col-span-8 flex flex-col gap-12">
            {/* Featured Post */}
            {filteredBlogs[0] && (
              <article className="group">
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

            {/* 2 Posts Below Featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {filteredBlogs.slice(1, 3).map((blog) => (
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
            </div>
          </div>

          {/* Right Column (2 Posts + Button + Extras) */}
          <aside className="md:col-span-4 flex flex-col gap-12">
            {/* 2 Posts on the right side */}
            {filteredBlogs.slice(3, 5).map((blog) => (
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

            {/* See All Blogs Button */}
            <button 
              onClick={() => setViewAll(true)}
              className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
            >
              See All Blogs
            </button>

            {/* Planned Itinerary */}
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
            </div>
          </aside>
        </div>
      )}

      {/* Visual Archive - Full Width Bottom */}
      <section className="mt-24">
        <div className="bg-secondary text-on-primary rounded-[3rem] p-12 md:p-24 overflow-hidden relative z-10">
          <div className="relative z-30 max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              Visual Archive
            </span>
            <h2 className="font-headline font-black text-5xl md:text-6xl mb-6 leading-tight">Stay Curious.<br/>Travel Deep.</h2>
            <p className="text-on-primary/80 text-xl mb-10 leading-relaxed">
              Adventure isn't about how far you go, but how much you see. We're constantly updating our field notes with new discoveries, hidden alleys, and local flavors from the road.
            </p>
            <Link to="/gallery" className="inline-flex items-center gap-3 bg-surface text-secondary px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl group relative z-40">
              Explore the Gallery
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          {/* Decorative Globe */}
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 pointer-events-none z-0">
            <Globe size={480} />
          </div>
        </div>
      </section>
    </div>

  );
}
