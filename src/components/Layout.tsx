import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, Menu, X } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tips", path: "/tips" },
    { name: "Blog", path: "/blog" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_12px_40px_rgba(48,47,41,0.06)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="PoorKids Adventures Logo" 
            className="h-10 w-auto transition-transform group-hover:scale-105"
            onError={(e) => {
              // Fallback to text if image is missing
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden font-headline font-black text-2xl text-primary tracking-tight">
            PoorKids Adventures
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-headline font-bold text-lg transition-all pb-1 ${
                location.pathname === link.path 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-on-surface hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-1.5 gap-2 border-b-2 border-on-surface-variant/20 focus-within:border-primary transition-colors">
            <Search size={16} className="text-on-surface-variant" />
            <input 
              className="bg-transparent border-none focus:outline-none text-sm w-32 placeholder:text-on-surface-variant/60" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-on-surface-variant/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-headline font-bold text-2xl transition-all ${
                    location.pathname === link.path 
                      ? "text-primary" 
                      : "text-on-surface"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <form onSubmit={handleSearch} className="flex items-center bg-surface-container rounded-full px-4 py-3 gap-3 border-b-2 border-on-surface-variant/20 focus-within:border-primary transition-colors mt-4">
                <Search size={20} className="text-on-surface-variant" />
                <input 
                  className="bg-transparent border-none focus:outline-none text-lg w-full placeholder:text-on-surface-variant/60" 
                  placeholder="Search stories..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-container w-full rounded-t-[3rem] mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-12 py-16 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="font-headline font-bold text-on-surface text-xl">PoorKids Adventures</div>
          <p className="text-on-surface-variant leading-relaxed">
            A digital scrapbook of travels and budget-friendly guides for the intentional wanderer. We don't just visit places; we live them.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <span className="font-bold text-sm uppercase tracking-widest text-primary">Connect</span>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">YouTube</a>
          <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors">Privacy</Link>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-bold text-sm uppercase tracking-widest text-primary">Manifesto</span>
          <p className="text-on-surface-variant italic font-headline">
            "Travel isn't about the destination, it's about the stories you tell when you finally make it back home."
          </p>
        </div>
      </div>
      <div className="border-t border-on-surface-variant/10 py-12 text-center">
        <div className="text-[11px] uppercase tracking-wider text-on-surface-variant opacity-50 font-bold mb-4">
          © 2024 POORKIDS ADVENTURES. TRAVEL INTENTIONAL.
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-headline text-on-surface-variant/80">
          <span>Hand-crafted with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={12} className="fill-secondary text-secondary" />
          </motion.div>
          <span>by</span>
          <span className="font-black tracking-tighter text-on-surface">
            ARGUS<span className="text-secondary">X</span>CODES
          </span>
        </div>
      </div>
    </footer>
  );
}
