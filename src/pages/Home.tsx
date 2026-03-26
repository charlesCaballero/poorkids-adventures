import { motion } from "motion/react";
import { ArrowRight, Map } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-[716px] rounded-3xl overflow-hidden shadow-xl scrapbook-rotate-right"
        >
          <img 
            alt="Group of friends traveling" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6f222DCuqMPDAdP3IUruCh7UHBq4Cw_rv0AUAtpJeJPmj40RSqgbDOP7AeDEXq719DbkffJnUMzueuY23B42nnjXliy96v75G2jfohXAogoFMqzIuaGpKdamWtOts8UDUoqjhjbaOUkbZws45gfg6u9lxNYBQx0PKf-cVzaf0UmK8VYPqzo3p3SEaL3br0GxYqI4kGmBMpQfl9qLYwKUoj5BUvBf5L82WKBRxVB22q9-ZV9uVyqScCqB66RY3Yrrw_RYmotrC_A4"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-12">
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white max-w-3xl leading-tight mb-6">
              Our World, One Budget Adventure at a Time.
            </h1>
            <div className="flex gap-4">
              <button className="signature-gradient text-on-primary font-headline font-bold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform">
                Start Exploring
              </button>
              <button className="bg-white/20 backdrop-blur-md text-white font-headline font-bold px-8 py-4 rounded-full text-lg hover:bg-white/30 transition-all">
                Our Story
              </button>
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoYaAJsM-6EkxqKK3LzWK-ZBkDZDTJ-pChsGuH_TWWFJUj1FG8T4s0UbGsIFlhs00WaYkt_Smo3RaDpYysX4VnOzA-1LmhkhAHNI1r1BXG-enkloM3oCKoFPMOFGroqzl5KeWu_FQy7t22GpQqn2L4VnIumq3dzNz7ZLexjrqw6mCVZPwo4eYEXkNJdyQQA0rfpcmexI9TzGUXeoLa-RbWirhAVxS-0PEN-tICP0etX9LYghL_CQ63F8ptZKvHAODrjhhXSIso4Dw"
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
            <button className="text-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Trips <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Neon Nights in Hong Kong",
                desc: "Mastering the Octopus card, hunting for the best $2 Michelin-star dim sum, and finding the quietest peaks.",
                tag: "Budget-Friendly",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB44E0Qt8WFnS_mXzt-g5WMnvwUN9DG_zBdhkWj6lVx3A6wLDixk9wQdVn-TxtAo0Z2F9QClsa-_oMcuOZawUcFmzQkY2u6o76go_dy9QBQvb_fx2Gwdu4J5WWOb0sz9YwnDbJ5lI-dsLfRVVWCtvVfY2MVPNcRzbbOdBtFBCm9uOWeIO1tlG0k769va6sD9xMa3pvGAgIcJD7DAE8e_rbO0V64vLabRcYpGkCcV0pBWvgejZfVHwXT-ASog-vHv65LH9fjRwITIOc"
              },
              {
                title: "Portuguese Echoes: Macau",
                desc: "A day trip that felt like another world. From egg tarts in sleepy villages to the glittering lights of Cotai.",
                tag: "Cultural Mix",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1czgNh6EVx7sX7FQmwj1H09hJxNrdppvV-CPIuwMKcqo3VR-7OFUR0_65fDYIGaZVv1NnWSoUuc7eoWgkCDXSCmN85irSSKqAwkilO0tCQLMpD1lmxEeC1CwC04NTcpkA9B5bV6bAfm9QMLlL2KLIpKXsd2n0GAq7wbf5dRxC2sJHQJEzQfr-S2fmtw4WlzaoBRQZQ-8l2irGpENWdMpdfevdApEdFPHwBk5_uWtEPmPSYmuxpAI1RB2B0lazs2JdaaQOUmzBNwM",
                offset: true
              },
              {
                title: "The Lion City on a Dime",
                desc: "Who says Singapore is expensive? Hawker centers, free botanical light shows, and wandering Little India.",
                tag: "City Guide",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEHDGg2IXNkfQh2tbjTEIyo_gN4ILMx1ldYRbanTVveM3MO2fSUTv89Rzp8lyivwSBg_ZDNwx5ApqhZTiNdXpyRBAgVEgXngORj7NUecuElwuvdTcf1b5y4fbYVsy8qpRgfPvdKTfE6NjTVIiCBd2bDtEZAQCef4f7Nk8gTyIyJWW8modp_7JHjSefNjp7k_B7gzQW-ezvl3Ji_Gr_e79Bzdjg3_AFPfxLrvBDR8ecX5Jr-NXSGjMp2uM3ZrxA_cIewGeB3gqVH2M"
              }
            ].map((trip, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all ${trip.offset ? 'md:mt-12' : ''}`}
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 right-4 bg-primary-container text-on-surface font-bold text-xs px-3 py-1 rounded-full uppercase">
                    {trip.tag}
                  </span>
                </div>
                <div className="p-8">
                  <h4 className="font-headline text-2xl font-bold mb-3">{trip.title}</h4>
                  <p className="text-on-surface-variant mb-6 line-clamp-2">{trip.desc}</p>
                  <button className="flex items-center gap-2 text-primary font-headline font-black uppercase text-sm tracking-widest">
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-8 py-24 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="font-headline text-4xl font-black mb-4">Pack your bags (digitally).</h2>
          <p className="text-on-surface-variant text-lg">Get our bi-weekly newsletter with budget itineraries, gear reviews, and stories from the road.</p>
        </div>
        <div className="flex-1 w-full max-w-md">
          <div className="flex flex-col gap-4">
            <input 
              className="bg-surface-container border-b-2 border-on-surface-variant/20 focus:border-primary focus:outline-none px-4 py-4 rounded-t-lg font-body text-lg transition-colors" 
              placeholder="Your adventure email..." 
            />
            <button className="signature-gradient text-on-primary font-headline font-bold py-4 rounded-full text-lg shadow-lg hover:scale-105 active:scale-95 transition-all">
              Join the Adventure
            </button>
          </div>
        </div>
      </section>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 signature-gradient text-on-primary p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group">
        <Map size={32} />
        <span className="absolute right-full mr-4 bg-on-surface text-surface text-xs font-bold px-3 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Map Our Travels
        </span>
      </button>
    </div>
  );
}
