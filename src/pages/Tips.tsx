import { motion } from "motion/react";
import { Backpack, Utensils, Train, CheckCircle, ArrowRight, Wallet, Home, Globe, Compass } from "lucide-react";

export default function Tips() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      <header className="mb-24 text-center md:text-left">
        <h1 className="font-headline font-black text-6xl md:text-8xl text-primary mb-6 tracking-tight leading-none">
          Travel Smarter,<br/>Spend <span className="text-secondary italic">Way</span> Less.
        </h1>
        <p className="max-w-2xl text-xl text-on-surface-variant leading-relaxed">
          The ultimate field guide for the intentional wanderer. We've gathered the community's best-kept secrets to seeing the world without a trust fund.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Tip */}
        <div className="md:col-span-8 bg-surface-container rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="bg-tertiary-container text-on-surface inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-bold mb-8">
                <Backpack size={14} />
                ESSENTIALS
              </div>
              <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6 tracking-tight">Budget Packing Hacks</h2>
              <p className="text-lg text-on-surface-variant mb-8 max-w-lg">
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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-fit bg-secondary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
              Read Full Guide <ArrowRight size={20} />
            </button>
          </div>
          <div className="absolute top-12 right-12 hidden lg:block scrapbook-rotate-right">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyHwNoCCPKn5xQHGqZTV02Se8OjAxQ2Kb_wu9kOdGP1EYBu3OV-IYOtjHd6iY-hgVw569zLEhRv_-FpFhtQGJkAOTojC3FG3hDVGMCIZqmW391tuj2Ypk1fhCCTNUVBQMjYblXmrhibz9sph9Jb_5CiwMdnTU3AnuG5LFCtcaP_j2ogHUXAqji0RcvswyuGH4WtxZEsTlB_KnB0cBvhFEUfSNhOcNPBMr-egg7B1MMtk0NsHJodLVyZhzBjGRPBr3MvsN37Fj8zlk" 
              className="w-64 h-80 object-cover rounded-xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Side Tip */}
        <div className="md:col-span-4 bg-surface-container rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <Utensils size={40} className="text-primary mb-6" />
            <h3 className="font-headline font-bold text-3xl mb-4">Cheap Eats in Asia</h3>
            <p className="text-on-surface-variant mb-6">
              From $1 bowls of Pho in Hanoi to the best night markets in Taipei. Eat like a king on a street-food budget.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 scrapbook-rotate-left shadow-sm">
            <p className="font-bold text-sm text-secondary uppercase tracking-widest mb-2">Pro Tip</p>
            <p className="text-sm italic">"Always follow the longest queue of locals. They know where the real value is."</p>
          </div>
        </div>

        {/* Transport */}
        <div className="md:col-span-4 bg-surface-container rounded-3xl p-8 relative group cursor-pointer hover:bg-on-surface-variant/10 transition-colors">
          <Train size={40} className="text-secondary mb-6" />
          <h3 className="font-headline font-bold text-3xl mb-4">Navigating Transport</h3>
          <p className="text-on-surface-variant mb-6">
            Mastering night buses, regional rail passes, and the art of hitching a safe ride.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary-container text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase">Rail</span>
            <span className="bg-secondary-container text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase">Local Bus</span>
          </div>
        </div>

        {/* Community */}
        <div className="md:col-span-8 bg-surface-container rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="font-headline font-bold text-3xl mb-4">Join the Collective</h3>
            <p className="text-on-surface-variant mb-6">
              Our community submits over 500+ budget tips monthly. Join the Discord to get real-time advice from travelers currently on the road.
            </p>
            <div className="flex -space-x-3 mb-6">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAFF0l1i0NS21HJRIAe_KfpbkDzVpBTeMyardTjteYRIORR0dw0996ElDP0BoeMOIHS7UiX442Lulaw2dJd0FoDR2-tgdMK6IkwYz11Ps0NO2CN5fC0tgqo_Me59MmF9GOWGuzXZY3HNNA1j2nMe6yWRY1hlQ8j1P8Cbsd4m5K0deD_4TXK2CwBIRuBLcDqmhfzgbqTM15grMUlm5a0_WJ7KmUQPV8BSQFOryF4TLam6udHXpxGgKe6aBdr6nGfibIANlgJybOMq4E",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD58JxwjpDBiWGQAoovFGw6MEAUFBaF5Y-PJMcmrdDmCa2SJ2aO2Wr0V1ppdpF-2kJ7SOy2AUVMFdVtTlGWMjdWaPTAxK-N4NiGWEVxtRDXTAcGmWYT4YxRgx2RNpr1kuyYAii8TWw5hTc5nTDHNpXSLUinzFjllaSD0FyPmZ2GbYpiomOlIPzxNMz_0qREpWNp-lgeXyHPLWeu7TDVxNWvPmbvUg_8AIA7ruDzwV6kks6mP7SOLzs9I3EmDc_Sx_Wwl29JcQD8Iw8",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA7tZFHuKOnU3ixKUXsvhfxFrWkCSrejvPv7UpqP4-ZiiPU39pv-t8PXBrr5EydrSi5LBCHYAuny0uQuKXDVja4j9l8iJiNWVWh9xds7A5gxJczqoeQmS3zZl18LcFXDTVvqiYk5ZekGz6s9g26GgjIf4vfGtmgWs-ThrsSdqYGzpG_sXdeF6wlcntjR_2S-L4aCqbF79CsCalJq2J9JElidSEjkBS09wNmktJoHltBuhkQLpvDUW3r4bq1CLd6TrEzPlNOjyQfFI4"
              ].map((img, i) => (
                <img key={i} src={img} className="w-12 h-12 rounded-full border-4 border-surface" referrerPolicy="no-referrer" />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-surface bg-primary text-on-primary flex items-center justify-center font-bold text-sm">+4k</div>
            </div>
          </div>
          <div className="w-full md:w-64 aspect-video bg-white rounded-2xl overflow-hidden shadow-lg border-8 border-white">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk9Rr7UoyiW6pC7OgeWirMlZGfymJP0P3lvXFN0vnowTFGEoAhH36ilA8mNxkhRztoTuB_dhR0Ug92PYYnIoAaFMdh7QKTOh6uKKUe3Da3yHh0sTN6H9y1V_AfZxyXz4qChCSY9fgr8L2adliG079GjGgwXqDJEtrVfbjLVZGjV4XTJjwljGp_tXwyF-3oiVD3Mg_PzWZxZnlw9VON1J3AkHCn1b4PpD7tVedRxSBFq6vAgOV4fOGpw_MbtjmWNNMYrbpjztX_Mjk" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
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
            { icon: Wallet, title: "Money Management", desc: "Use digital banks like Revolut or Monzo to avoid transaction fees. Always pay in local currency at ATMs." },
            { icon: Home, title: "Accommodations", desc: "Look for 'Guesthouses' instead of 'Hotels'. Often family-run, cheaper, and includes breakfast." },
            { icon: Globe, title: "Offline Survival", desc: "Download Google Maps areas and Google Translate dictionaries offline. Data roaming is a budget killer." }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <item.icon size={32} className="text-primary" />
              <h4 className="font-bold text-xl">{item.title}</h4>
              <p className="text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-32 bg-primary text-on-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="font-headline font-black text-5xl mb-6">Get the 'Scout Report'</h2>
          <p className="text-on-primary/80 text-xl mb-10">Weekly flight errors, secret hostels, and packing list updates. No fluff, just value.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              className="flex-1 bg-white/10 border-b-2 border-white/40 focus:border-white focus:outline-none placeholder:text-white/50 text-white px-0 py-4 transition-colors" 
              placeholder="Your email address" 
            />
            <button className="bg-surface text-primary px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">JOIN</button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <Compass size={480} />
        </div>
      </section>
    </div>
  );
}
