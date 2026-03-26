import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tips", path: "/tips" },
    { name: "Blog", path: "/blog" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_12px_40px_rgba(48,47,41,0.06)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="font-headline font-black text-2xl text-primary tracking-tight">
          PoorKids Adventures
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

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-1.5 gap-2 border-b-2 border-on-surface-variant/20">
            <Search size={16} className="text-on-surface-variant" />
            <input 
              className="bg-transparent border-none focus:outline-none text-sm w-32 placeholder:text-on-surface-variant/60" 
              placeholder="Search..." 
            />
          </div>
          <button className="signature-gradient text-on-primary font-headline font-bold px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md">
            Sign Up
          </button>
        </div>
      </div>
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
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Newsletter</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy</a>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-bold text-sm uppercase tracking-widest text-primary">Manifesto</span>
          <p className="text-on-surface-variant italic font-headline">
            "Travel isn't about the destination, it's about the stories you tell when you finally make it back home."
          </p>
          <div className="pt-4 text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            © 2024 POORKIDS ADVENTURES. TRAVEL INTENTIONAL.
          </div>
        </div>
      </div>
    </footer>
  );
}
