import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Backpack, Utensils, Train, CheckCircle, ArrowRight, Wallet, Home, Globe, Compass, X, Users, Smartphone, ShieldCheck } from "lucide-react";

interface TipDetail {
  id: string;
  title: string;
  category: string;
  icon: any;
  content: React.ReactNode;
  image?: string;
  fallback?: string;
}

export default function Tips() {
  const [selectedTip, setSelectedTip] = useState<TipDetail | null>(null);

  const tipsData: Record<string, TipDetail> = {
    packing: {
      id: "packing",
      title: "Budget Packing Hacks",
      category: "ESSENTIALS",
      icon: Backpack,
      image: "/tips/packing.webp",
      fallback: "https://images.unsplash.com/photo-1553531384-397c80973a0b?auto=format&fit=crop&q=80&w=800",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            Forget expensive ultralight gear. The secret to budget travel is fitting everything into a single personal item bag to avoid airline fees.
          </p>
          
          <section>
            <h4 className="font-bold text-xl mb-3 text-primary">The 5-4-3-2-1 Capsule Method</h4>
            <p className="mb-2">This is the gold standard for packing light without feeling like you're wearing the same thing every day:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>5 Tops:</strong> Mix of tees and one button-up.</li>
              <li><strong>4 Bottoms:</strong> 2 shorts, 1 pants, 1 swimwear.</li>
              <li><strong>3 Shoes:</strong> Walking sneakers, sandals, and one "nice" pair.</li>
              <li><strong>2 Bags:</strong> Your main backpack and a small daypack/sling.</li>
              <li><strong>1 Hat/Accessory:</strong> A versatile cap or scarf.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-xl mb-3 text-primary">DIY Laundry Kit</h4>
            <p>Don't pay for hotel laundry. Carry a universal sink stopper, a small bottle of concentrated soap, and a braided elastic clothesline. You can wash a few items every night in 10 minutes.</p>
          </section>

          <section>
            <h4 className="font-bold text-xl mb-3 text-primary">The "Everything" Scarf</h4>
            <p>A large linen scarf is a blanket on cold planes, a towel at the beach, a pillow on buses, and required for visiting temples in many countries.</p>
          </section>
        </div>
      )
    },
    eats: {
      id: "eats",
      title: "Cheap Eats: SG, HK, VN",
      category: "FOOD",
      icon: Utensils,
      image: "/tips/eats.webp",
      fallback: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
      content: (
        <div className="space-y-8">
          <section>
            <h4 className="font-bold text-2xl mb-4 text-primary">Singapore: Hawker Heaven</h4>
            <div className="space-y-3">
              <p><strong>Maxwell Food Centre:</strong> Home to the famous Tian Tian Hainanese Chicken Rice. Expect a queue, but it's worth the $5 SGD.</p>
              <p><strong>Old Airport Road:</strong> Where the locals go. Try the Lor Mee or Satay. Most meals are under $6 SGD.</p>
              <p><strong>Lau Pa Sat:</strong> Visit "Satay Street" after 7 PM when they close the road and fire up the grills.</p>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-2xl mb-4 text-secondary">Hong Kong: Dim Sum & Street Food</h4>
            <div className="space-y-3">
              <p><strong>Tim Ho Wan:</strong> The world's cheapest Michelin-starred restaurant. The BBQ Pork Buns are mandatory.</p>
              <p><strong>Australia Dairy Company:</strong> Iconic HK breakfast. Scrambled eggs and macaroni soup. It's fast, loud, and delicious.</p>
              <p><strong>Mong Kok Street Food:</strong> Head to Dundas Street for curry fish balls, egg waffles, and stinky tofu.</p>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-2xl mb-4 text-primary">Vietnam: The Street is Your Kitchen</h4>
            <div className="space-y-3">
              <p><strong>Hanoi Old Quarter:</strong> Sit on a tiny plastic stool and order Bun Cha or Pho. A full meal costs about $2 USD.</p>
              <p><strong>Hoi An Banh Mi:</strong> Visit Banh Mi Phuong (made famous by Anthony Bourdain). The best sandwich you'll ever have for $1.50.</p>
              <p><strong>Saigon Coffee:</strong> Look for "Ca Phe Sua Da" at any street corner. Strong, sweet, and keeps you moving.</p>
            </div>
          </section>
        </div>
      )
    },
    transport: {
      id: "transport",
      title: "Navigating Transport",
      category: "LOGISTICS",
      icon: Train,
      image: "/tips/transport.webp",
      fallback: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      content: (
        <div className="space-y-8">
          <section>
            <h4 className="font-bold text-2xl mb-4 text-primary">Hong Kong: The Octopus King</h4>
            <p className="mb-4">Get an <strong>Octopus Card</strong> immediately. It works on the MTR, buses, ferries, and even at 7-Eleven.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Star Ferry:</strong> The cheapest and most beautiful way to cross the harbor ($5 HKD).</li>
              <li><strong>The Tram (Ding Ding):</strong> Only $3 HKD for a slow, scenic ride through HK Island.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-2xl mb-4 text-secondary">Singapore: Simply Efficient</h4>
            <p className="mb-4">You don't even need a travel card anymore. Just tap your <strong>Visa/Mastercard</strong> or Apple/Google Pay on any bus or MRT.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>MRT:</strong> Covers the whole island. Clean, fast, and air-conditioned.</li>
              <li><strong>Grab:</strong> The go-to ride-hailing app. Use "GrabShare" to save even more.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-2xl mb-4 text-primary">Vietnam: Grab Everything</h4>
            <p className="mb-4">Download the <strong>Grab app</strong>. It's essential for avoiding "tourist prices" with taxis.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>GrabBike:</strong> The fastest way through traffic. Cheap and thrilling.</li>
              <li><strong>Sleeper Buses:</strong> Great for long distances (Hanoi to Sapa). You get a full bed!</li>
              <li><strong>Reunification Express:</strong> The train from North to South. Book "Soft Sleeper" for the best experience.</li>
            </ul>
          </section>
        </div>
      )
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      <header className="mb-24 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-headline font-black text-6xl md:text-8xl text-primary mb-6 tracking-tight leading-none">
            Travel Smarter,<br/>Spend <span className="text-secondary italic">Way</span> Less.
          </h1>
          <p className="max-w-2xl text-xl text-on-surface-variant leading-relaxed">
            The ultimate field guide for the intentional wanderer. We've gathered our best-kept secrets to seeing the world without a trust fund.
          </p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Tip */}
        <div className="md:col-span-8 bg-surface-container rounded-3xl p-6 md:p-12 relative overflow-hidden group">
          <div className="relative z-20 flex flex-col h-full justify-between">
            <div>
              <div className="bg-tertiary-container text-on-surface inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold mb-6 md:mb-8">
                <Backpack size={14} />
                ESSENTIALS
              </div>
              <h2 className="font-headline font-bold text-3xl md:text-5xl mb-6 tracking-tight">Budget Packing Hacks</h2>
              <p className="text-base md:text-lg text-on-surface-variant mb-8 max-w-lg">
                Forget expensive ultralight gear. Learn how to repurpose everyday items and fit three weeks of life into a single personal item bag.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "The 5-4-3-2-1 Capsule Method",
                  "DIY Laundry Kits for $2",
                  "Multi-purpose 'Everything' Scarf"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-primary" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button 
              onClick={() => setSelectedTip(tipsData.packing)}
              className="w-full sm:w-fit bg-secondary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 relative z-30"
            >
              Read Full Guide <ArrowRight size={20} />
            </button>
          </div>
          <div className="absolute top-12 right-12 hidden lg:block scrapbook-rotate-right pointer-events-none z-10">
            <img 
              src="https://images.unsplash.com/photo-1553531384-397c80973a0b?auto=format&fit=crop&q=80&w=400" 
              className="w-64 h-80 object-cover rounded-xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Side Tip */}
        <div 
          onClick={() => setSelectedTip(tipsData.eats)}
          className="md:col-span-4 bg-surface-container rounded-3xl p-8 flex flex-col justify-between cursor-pointer hover:bg-secondary/5 transition-colors group"
        >
          <div>
            <Utensils size={40} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-headline font-bold text-3xl mb-4">Cheap Eats in Asia</h3>
            <p className="text-on-surface-variant mb-6">
              From $1 bowls of Pho in Hanoi to the best Michelin-starred dim sum in HK. Eat like a king on a street-food budget.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 scrapbook-rotate-left shadow-sm">
            <p className="font-bold text-sm text-secondary uppercase tracking-widest mb-2">Pro Tip</p>
            <p className="text-sm italic">"Always follow the longest queue of locals. They know where the real value is."</p>
          </div>
        </div>

        {/* Transport */}
        <div 
          onClick={() => setSelectedTip(tipsData.transport)}
          className="md:col-span-4 bg-surface-container rounded-3xl p-8 relative group cursor-pointer hover:bg-secondary/5 transition-colors"
        >
          <Train size={40} className="text-secondary mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="font-headline font-bold text-3xl mb-4">Navigating Transport</h3>
          <p className="text-on-surface-variant mb-6">
            Mastering the MTR in HK, the efficient MRT in Singapore, and the thrill of GrabBikes in Vietnam.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary-container text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase">Octopus Card</span>
            <span className="bg-secondary-container text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase">Grab App</span>
          </div>
        </div>

        {/* Travel Crew */}
        <div className="md:col-span-8 bg-primary text-on-primary rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Users size={24} />
              <span className="font-bold uppercase tracking-widest text-sm">The Travel Crew</span>
            </div>
            <h3 className="font-headline font-bold text-3xl mb-4">Not a community, just us.</h3>
            <p className="text-on-primary/80 mb-6 text-lg">
              This isn't a massive travel site. It's just a small group of friends who love to wander. Every tip here is tried, tested, and occasionally failed by one of us.
            </p>
            <div className="flex -space-x-3 mb-6">
              {[
                { img: "/about/charles.webp", fallback: "https://i.pravatar.cc/150?u=charles" },
                { img: "/about/sarah.webp", fallback: "https://i.pravatar.cc/150?u=sarah" },
                { img: "/about/mike.webp", fallback: "https://i.pravatar.cc/150?u=mike" },
                { img: "/about/elena.webp", fallback: "https://i.pravatar.cc/150?u=elena" }
              ].map((member, i) => (
                <img 
                  key={i} 
                  src={member.img} 
                  className="w-12 h-12 rounded-full border-4 border-primary shadow-lg object-cover" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = member.fallback;
                  }}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-64 aspect-square bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 p-6">
            <div className="text-center">
              <Compass size={64} className="mx-auto mb-4 text-white/50" />
              <p className="font-headline font-bold text-xl">Since 2018</p>
              <p className="text-sm opacity-60">Sharing the road</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-32">
        <h2 className="font-headline font-bold text-4xl mb-12 flex items-center gap-4">
          <span className="w-12 h-1 bg-primary"></span>
          The Quick List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Wallet, title: "Money Management", desc: "Use digital banks like Revolut or Wise to avoid transaction fees. Always pay in local currency at ATMs." },
            { icon: Smartphone, title: "Essential Apps", desc: "Grab (SE Asia), Google Maps (Offline), XE Currency, and Klook for booking activities at a discount." },
            { icon: ShieldCheck, title: "Safety & Health", desc: "Always have travel insurance. Keep a digital copy of your passport on Google Drive and a physical one hidden in your bag." }
          ].map((item, i) => (
            <div key={i} className="space-y-4 p-6 rounded-2xl bg-surface-container hover:y-[-4px] transition-all">
              <item.icon size={32} className="text-primary" />
              <h4 className="font-bold text-xl">{item.title}</h4>
              <p className="text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-32 relative">
        <div className="bg-secondary text-on-primary rounded-[3rem] p-12 md:p-24 overflow-hidden relative z-10">
          <div className="relative z-30 max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              The Visual Archive
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

      {/* Tip Detail Modal */}
      <AnimatePresence>
        {selectedTip && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTip(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-surface w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl"
            >
              <button 
                onClick={() => setSelectedTip(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              {selectedTip.image && (
                <div className="w-full h-64 md:h-80 relative">
                  <img 
                    src={selectedTip.image} 
                    alt={selectedTip.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (selectedTip.fallback) {
                        e.currentTarget.src = selectedTip.fallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </div>
              )}

              <div className="p-8 md:p-12 -mt-12 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <selectedTip.icon size={20} />
                  </div>
                  <span className="font-bold text-sm tracking-widest text-secondary uppercase">{selectedTip.category}</span>
                </div>
                <h2 className="font-headline font-black text-4xl md:text-5xl mb-8 tracking-tight">{selectedTip.title}</h2>
                <div className="prose prose-lg max-w-none text-on-surface-variant">
                  {selectedTip.content}
                </div>
                
                <div className="mt-12 pt-8 border-t border-on-surface/10 flex items-center gap-4">
                  <img 
                    src="/about/charles.webp" 
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.pravatar.cc/150?u=charles";
                    }}
                  />
                  <div>
                    <p className="font-bold text-sm">Written by the Crew</p>
                    <p className="text-xs opacity-60">Last updated March 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
