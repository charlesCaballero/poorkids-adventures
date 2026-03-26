import { motion } from "motion/react";
import { ArrowRight, MapPin, Plane, Hotel, Mail } from "lucide-react";

export default function Blog() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-24 relative">
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
        {["All Entries", "City Life", "Nature", "Upcoming"].map((cat, i) => (
          <button 
            key={cat}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-transform hover:scale-105 ${
              i === 0 ? "bg-primary text-on-primary" : "bg-secondary-container text-secondary"
            }`}
          >
            {cat === "Upcoming" && <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />}
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Main Post */}
        <article className="md:col-span-8 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 0 }}
            className="relative mb-8 overflow-hidden rounded-xl scrapbook-rotate-left transition-transform duration-500"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrMzSn4K39GokH2fh1dxRGaY6JmtJeM9CrEFJdplfiKfC9YusHaXibJjQ-NsTPhGMAotUNlz27YtWeiQj4ras-wUSi9vYw9-3X0IaFCL8txPFOz4hx0a2g6Wufb0XfdWmvTJWCG4BJKP9m7DNnoXTh3hbvPtlmaGgqOYHbOfELsfTwy3b68fwb-NerRtX5DQhhZskY0GiY_5W_hbrMyEmepmkgXCQZCFhF-x8LHiYAWvnrZeXM9os7k2eV0QNKe60iKsJP-a5bMeY" 
              className="w-full aspect-[16/9] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-secondary">City Life</span>
            </div>
          </motion.div>
          <div className="max-w-2xl">
            <time className="text-sm text-on-surface-variant font-semibold mb-2 block">March 14, 2024 — Hong Kong</time>
            <h2 className="font-headline text-4xl font-extrabold group-hover:text-primary transition-colors mb-4">Finding Silence in the Chaos of Mong Kok</h2>
            <p className="text-on-surface-variant line-clamp-3 mb-6">
              Between the stacks of bamboo scaffolding and the perpetual scent of curry fishballs, there is a rhythm only those who walk it can feel. We spent three nights dodging the rain and finding the best hidden rooftops...
            </p>
            <button className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all">
              Read Journal Entry <ArrowRight size={20} />
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-12">
          <article className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-lg scrapbook-rotate-right transition-transform duration-500 hover:rotate-0">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6gQd9Syh4NWJTuBcJF0sPPVF-f5rkAyMDmWnSn0k2wD6aJiwP-uN31IsQzhE-LC27_0cmuTfSAHGbEtnvlLUGqXPJoj9QRJWoxBMLpv0IN46UadZrwTgj1zsy9fgWzoD4LhmqSqNLWtz-akOotWl_Af1ckP3L7Ahziv9vFWEjOq8ai8h4OFXdJxDJit92J9oOhxGUCsjA3sfKZ7Yw-aVAs3mj36m_4cioBdynpTh12aJJHVlFUN54mgat7Gq_o5VTPbwFnvGr9w8" 
                className="w-full aspect-square object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <time className="text-xs text-on-surface-variant font-semibold mb-1 block">Feb 28, 2024</time>
            <h3 className="font-headline text-xl font-bold group-hover:text-primary transition-colors">The Mist of Sa Pa: A Journey into the Clouds</h3>
            <div className="mt-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-tertiary-container text-on-surface rounded">Nature</span>
            </div>
          </article>

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

      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <article className="group cursor-pointer">
          <div className="mb-6 overflow-hidden rounded-xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMvZ3inhLFzSfIQp3a1xMqT2Sasi-dk6OSRKXZPoVvySwTGVZQ0ITIDxKkwD_sYjp8CkVq4BNr66PbywDa8NrF8G9UMRYaFvNj-gViTFw7p6zYb_g6jnR5RuEVmnXfB_X4AU5nJkCLXshg59bG2rryOFWd-MeD10sLnjbPmNnf4r4x9M3drJfRsusPQGzqPaT7pqZviX7IaGKaCI0eDxNDt5T1TipRmen2lHuP1jFDI6qjjnNV7MSg-_zRTg3ktjgHKdA85gmVCfw" 
              className="w-full aspect-[4/3] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <time className="text-sm text-on-surface-variant mb-2 block">Feb 15, 2024</time>
          <h3 className="font-headline text-2xl font-extrabold mb-3">5 Dishes You Can't Miss in Ho Chi Minh City</h3>
          <p className="text-sm text-on-surface-variant mb-4">From the iconic Bánh mì to the complexity of Bún bò Huế, here is how we ate for under $10 a day.</p>
          <span className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline">Explore Flavors</span>
        </article>

        <article className="group cursor-pointer">
          <div className="mb-6 overflow-hidden rounded-xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE-5KlywjywiHWe2VHf1v8p9yK8EYRIXbPfKiICDa3lvaeaHmq9o1gNEOiogYSNuFf_ZC3n9dtw2r3iLZCYseqdZZbFNbNqItDlmKwYne4qn4uDOjYO1fMovLAkxynu1EUeLubwj6GwTHeuvvhnq6kYuGLrt7HICgGT5d_P21IwZyt_JoFJWoO8mLfxv1VLJZBHs9x5pe9zIc0TiTrW11fIDod1197j27W4W-SFMRWmogcKkXFU7KVB4SCA3kqnc-kOwkiL5EqNDo" 
              className="w-full aspect-[4/3] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <time className="text-sm text-on-surface-variant mb-2 block">Jan 22, 2024</time>
          <h3 className="font-headline text-2xl font-extrabold mb-3">Riding the 'Ding Ding' to Nowhere</h3>
          <p className="text-sm text-on-surface-variant mb-4">The cheapest tour in the world is a HKD 2.60 tram ride through the heart of the island. Here's our favorite route.</p>
          <span className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline">Read Journal</span>
        </article>

        <div className="bg-primary-container p-8 rounded-xl flex flex-col justify-center aspect-[4/3]">
          <Mail size={40} className="text-on-surface mb-4" />
          <h3 className="font-headline text-2xl font-extrabold mb-2">Want the Full Log?</h3>
          <p className="text-on-surface-variant text-sm mb-6">Our raw, unedited travel notes are delivered weekly to our inner circle.</p>
          <input className="bg-white/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary mb-3" placeholder="Email Address" />
          <button className="bg-on-surface text-surface py-3 rounded-lg font-bold text-sm">Join the Newsletter</button>
        </div>
      </section>
    </div>
  );
}
