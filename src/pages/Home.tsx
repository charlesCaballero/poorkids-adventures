import { motion } from "motion/react";
import { ArrowRight, Map, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string | null;
}

export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.blogs)) {
          setRecentBlogs(data.blogs.slice(0, 3));
        }
      })
      .catch(err => console.error("Failed to fetch blogs:", err))
      .finally(() => setIsLoading(false));
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
              // Fallback if the image doesn't exist yet
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
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
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

      {/* Recent Expeditions */}
      <section className="bg-surface-container py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h3 className="font-headline text-4xl font-black text-primary mb-2">Recent Expeditions</h3>
              <p className="text-on-surface-variant">Freshly stamped pages from our favorite Asian escapes.</p>
            </div>
            <Link to="/blog" className="text-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Trips <ArrowRight size={20} />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs.map((blog, i) => (
                <motion.div 
                  key={blog.id}
                  whileHover={{ y: -10 }}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all ${i === 1 ? 'md:mt-12' : ''}`}
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={blog.thumbnail || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        referrerPolicy="no-referrer" 
                      />
                      <span className="absolute top-4 right-4 bg-primary-container text-on-surface font-bold text-xs px-3 py-1 rounded-full uppercase">
                        {blog.category}
                      </span>
                    </div>
                    <div className="p-8">
                      <h4 className="font-headline text-2xl font-bold mb-3">{blog.title}</h4>
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

      {/* FAB */}
      <Link to="/gallery" className="fixed bottom-8 right-8 signature-gradient text-on-primary p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group">
        <Map size={32} />
        <span className="absolute right-full mr-4 bg-on-surface text-surface text-xs font-bold px-3 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Map Our Travels
        </span>
      </Link>
    </div>
  );
}
