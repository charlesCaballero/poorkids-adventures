import { motion } from "motion/react";
import { ArrowRight, Map, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Skeleton";

interface Blog {
  id: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string | null;
}

interface GalleryImage {
  url: string;
  category: string;
  id: string;
}

// Module-level cache variables to persist data across route navigation
let cachedBlogs: Blog[] | null = null;
let cachedGallery: GalleryImage[] | null = null;

export default function Home() {
  // Initialize state with cached data if it exists
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>(cachedBlogs || []);
  const [recentGallery, setRecentGallery] = useState<GalleryImage[]>(cachedGallery || []);
  // Only show loading state if we don't have cached data yet
  const [isLoading, setIsLoading] = useState(!cachedBlogs || !cachedGallery);

  useEffect(() => {
    // If we already have the cache, skip the fetch request entirely
    if (cachedBlogs && cachedGallery) {
      return;
    }

    const fetchAllData = async () => {
      try {
        const [blogsRes, galleryRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/gallery")
        ]);

        const blogsData = await blogsRes.json();
        const galleryData = await galleryRes.json();

        if (blogsData && Array.isArray(blogsData.blogs)) {
          const fetchedBlogs = blogsData.blogs.slice(0, 3);
          cachedBlogs = fetchedBlogs; // Save to cache
          setRecentBlogs(fetchedBlogs);
        }

        if (galleryData && Array.isArray(galleryData.images)) {
          const shuffledGallery = [...galleryData.images].sort(() => Math.random() - 0.5);
          const fetchedGallery = shuffledGallery.slice(0, 6);
          cachedGallery = fetchedGallery; 
          setRecentGallery(fetchedGallery);
        }
      } catch (err) {
        console.error("Failed to fetch home data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-[500px] md:h-[716px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl scrapbook-rotate-right"
        >
          <img 
            alt="Our latest adventure" 
            className="w-full h-full object-cover" 
            src="/home/hero.webp"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1920";
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
            <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl font-black text-white max-w-3xl leading-tight mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Our World, One Budget Adventure at a Time.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/gallery" className="signature-gradient text-on-primary font-headline font-bold px-8 py-3 md:py-4 rounded-full text-base md:text-lg hover:scale-105 transition-transform text-center">
                Start Exploring
              </Link>
              <Link to="/about" className="bg-white/20 backdrop-blur-md text-white font-headline font-bold px-8 py-3 md:py-4 rounded-full text-base md:text-lg hover:bg-white/30 transition-all border border-white/30 text-center">
                Our Story
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <div className="space-y-6">
          <div className="inline-block bg-secondary-container text-secondary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
            Digital Field Journal
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface leading-tight">
            Authentic travel for those who refuse to wait for a fortune.
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
            We believe the richest experiences don't come from five-star resorts, but from the street corners, train rides, and shared hostels where real life happens. Join us as we document every penny-pinching tip and hidden gem.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="bg-surface-container p-8 rounded-2xl scrapbook-rotate-left relative z-10 shadow-lg">
            <img 
              alt="Travel notebook" 
              className="rounded-xl shadow-md mb-6 w-full h-64 object-cover" 
              src="/home/intro.webp"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800";
              }}
              referrerPolicy="no-referrer"
            />
            <p className="font-headline italic text-on-surface-variant text-center">
              "Adventure is a state of mind, not a balance in a bank account."
            </p>
          </div>
        </div>
      </section>

      {/* Visual Stories (Gallery Preview) */}
      <section className="bg-on-surface text-surface py-24 mb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">The Visual Journal</span>
              <h3 className="font-headline text-4xl md:text-6xl font-black mb-6">Captured Moments.</h3>
              <p className="text-surface/70 text-lg">
                A collective scrapbook of our travels. These are the views, streets, and stories shared by a bunch of broke but adventurous explorers.
              </p>
            </div>
            <Link to="/gallery" className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
              View All Memories <ArrowRight size={20} />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentGallery.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`aspect-square rounded-xl overflow-hidden scrapbook-rotate-${i % 2 === 0 ? 'left' : 'right'} group cursor-pointer`}
                >
                  <img 
                    src={img.url} 
                    alt="Gallery highlight" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${img.id}/400/400`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Expeditions */}
      <section className="py-24 mb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">The Field Notes</span>
              <h3 className="font-headline text-4xl md:text-6xl font-black text-primary mb-6">Recent Expeditions</h3>
              <p className="text-on-surface-variant text-lg">Freshly stamped pages from our favorite Asian escapes.</p>
            </div>
            <Link to="/blog" className="text-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Trips <ArrowRight size={20} />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`bg-surface-container rounded-3xl p-8 h-[450px] ${i === 1 ? 'md:mt-12' : ''}`}>
                  <Skeleton className="h-64 w-full rounded-xl mb-6" />
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-6" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs.map((blog, i) => (
                <motion.div 
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all ${i === 1 ? 'md:mt-12' : ''}`}
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="h-72 overflow-hidden relative">
                      <img 
                        src={blog.thumbnail || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <span className="absolute top-6 right-6 bg-primary text-on-primary font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {blog.category}
                      </span>
                    </div>
                    <div className="p-8">
                      <h4 className="font-headline text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{blog.title}</h4>
                      <p className="text-on-surface-variant mb-6 line-clamp-2">
                        {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-headline font-black uppercase text-sm tracking-widest">
                        Read More <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Travel Toolkit (Tips Preview) */}
      <section className="bg-surface-container py-24 mb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Travel Toolkit</span>
              <h3 className="font-headline text-4xl md:text-5xl font-black mb-8 leading-tight">Travel Smarter, Spend Way Less.</h3>
              <p className="text-on-surface-variant text-lg mb-10">
                The ultimate field guide for the intentional wanderer. We've gathered our best-kept secrets to seeing the world without a trust fund.
              </p>
              <Link to="/tips" className="inline-flex items-center gap-3 bg-secondary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Get All Tips <ArrowRight size={20} />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Budget Packing Hacks", desc: "Fit three weeks of life into a single personal item bag.", icon: "🎒" },
                { title: "Cheap Eats in Asia", desc: "Eat like a king on a street-food budget. $1 bowls of Pho.", icon: "🍜" },
                { title: "Navigating Transport", desc: "Mastering the MTR, MRT, and the thrill of GrabBikes.", icon: "🚆" },
                { title: "Money Management", desc: "Avoid transaction fees and always pay in local currency.", icon: "💰" }
              ].map((tip, i) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h4 className="font-headline font-bold text-xl mb-2">{tip.title}</h4>
                  <p className="text-on-surface-variant text-sm">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Crew (About Preview) */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">The Faces Behind the Blog</span>
          <h3 className="font-headline text-4xl md:text-6xl font-black mb-6">Meet the Crew.</h3>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            We're not a massive travel community. We're just five friends who love to wander, eat street food, and get lost in new cities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { name: "Charles", role: "The Financier", img: "/about/charles.webp", fallback: "https://i.pravatar.cc/150?u=charles" },
            { name: "Noelle", role: "The Planner", img: "/about/noelle.webp", fallback: "https://i.pravatar.cc/150?u=noelle" },
            { name: "Reylan", role: "The Researcher", img: "/about/reylan.webp", fallback: "https://i.pravatar.cc/150?u=reylan" },
            { name: "Peps", role: "The Local Talker", img: "/about/peps.webp", fallback: "https://i.pravatar.cc/150?u=peps" },
            { name: "CJ", role: "The Picture Freak", img: "/about/cj.webp", fallback: "https://i.pravatar.cc/150?u=cj" }
          ].map((crew, i) => (
            <motion.div
              key={crew.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface-container p-6 rounded-3xl text-center group hover:bg-primary/5 transition-colors"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img 
                  src={crew.img} 
                  alt={crew.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = crew.fallback;
                  }}
                />
              </div>
              <h4 className="font-headline font-bold text-xl mb-1">{crew.name}</h4>
              <p className="text-secondary text-sm font-bold uppercase tracking-widest">{crew.role}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/about" className="text-primary font-bold flex items-center justify-center gap-2 hover:gap-4 transition-all">
            Read Our Full Story <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-on-primary rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl font-black mb-8 tracking-tighter">Ready for your next adventure?</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto font-medium">
              The world is waiting, and your budget is bigger than you think. Start your journey today.
            </p>
            <Link to="/gallery" className="inline-block bg-white text-primary font-headline font-black px-12 py-5 rounded-full text-xl hover:scale-105 transition-transform shadow-xl uppercase tracking-widest">
              Explore the Gallery
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </motion.div>
      </section>

    </div>
  );
}