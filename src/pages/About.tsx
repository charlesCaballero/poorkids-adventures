import { motion } from "motion/react";
import { Heart, Users, Compass, Camera, MapPin, Coffee } from "lucide-react";

export default function About() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      <header className="mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-bold text-sm uppercase tracking-[0.2em] text-secondary mb-4 block">The Origin Story</span>
          <h1 className="font-headline font-black text-6xl md:text-8xl text-primary mb-6 tracking-tight leading-none">
            Broke, Bold, and<br/><span className="text-secondary italic">Boundless.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-on-surface-variant leading-relaxed">
            PoorKids Adventures started as a joke between friends who realized they didn't need a trust fund to see the world—just a lot of curiosity and a high tolerance for overnight buses.
          </p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-32">
        <div className="space-y-8 order-1 md:order-1">
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-on-surface">Our Philosophy</h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            We believe that the best travel stories aren't found in luxury resorts or curated tours. They're found in the $2 street food stalls, the 12-hour train rides across borders, and the shared hostel rooms where strangers become lifelong friends.
          </p>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            This blog is our digital scrapbook. It's a place where we document the raw, unpolished reality of budget travel. No filters (mostly), no fluff—just real experiences for real people.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Heart size={20} />
              </div>
              <span className="font-bold text-sm sm:text-base">Intentional</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Users size={20} />
              </div>
              <span className="font-bold text-sm sm:text-base">Authentic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Compass size={20} />
              </div>
              <span className="font-bold text-sm sm:text-base">Curious</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Coffee size={20} />
              </div>
              <span className="font-bold text-sm sm:text-base">Caffeinated</span>
            </div>
          </div>
        </div>
        <div className="relative order-2 md:order-2">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="bg-surface-container p-4 rounded-[2rem] scrapbook-rotate-right shadow-2xl relative z-10">
            <img 
              src="/about/philosophy.webp" 
              alt="Friends on a trip"
              className="rounded-[1.5rem] w-full h-[300px] md:h-[500px] object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800";
              }}
            />
            <div className="absolute bottom-8 -left-4 md:bottom-12 md:-left-8 bg-white p-4 rounded-xl shadow-xl scrapbook-rotate-left max-w-[160px] md:max-w-[200px]">
              <p className="text-xs md:text-sm italic font-headline">"The goal isn't to escape life, but for life not to escape us."</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="font-headline font-bold text-4xl mb-4">The Crew</h2>
          <p className="text-on-surface-variant">The faces behind the field notes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              name: "Charles", 
              role: "Founder & The Human ATM", 
              bio: "The visionary behind PoorKids Adventures. Technically funds the trips by letting everyone use his credit card for bookings. The silent backbone and the one documenting our journey here.", 
              img: "/about/charles.webp", 
              fallback: "https://i.pravatar.cc/150?u=charles",
              highlight: true 
            },
            { name: "Noelle", role: "The Logistics Lead", bio: "Plans the whole trip, handles all travel documents, and crafts the perfect itinerary. Keeps us all in line.", img: "/about/noelle.webp", fallback: "https://i.pravatar.cc/150?u=noelle" },
            { name: "Reylan", role: "The Scout", bio: "Our lead researcher who finds and recommends the best spots, from hidden hotels to the tastiest street food.", img: "/about/reylan.webp", fallback: "https://i.pravatar.cc/150?u=reylan" },
            { name: "Peps", role: "The Resident Tita", bio: "Talks to locals like a local and always has a funny story from her wild experiences to share.", img: "/about/peps.webp", fallback: "https://i.pravatar.cc/150?u=peps" },
            { name: "CJ", role: "The Pictorial King", bio: "Obsessed with the perfect shot. Will spend half an hour in one spot until the pose and quality are just right.", img: "/about/cj.webp", fallback: "https://i.pravatar.cc/150?u=cj" }
          ].map((member, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className={`bg-surface-container rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden ${member.highlight ? 'md:col-span-2 border-2 border-primary/20 shadow-xl' : ''}`}
            >
              {member.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-on-primary px-6 py-2 rounded-bl-3xl font-headline font-black text-xs uppercase tracking-widest shadow-lg z-10">
                  Founder
                </div>
              )}
              <div className="shrink-0">
                <img 
                  src={member.img} 
                  className={`${member.highlight ? 'w-48 h-48 md:w-64 md:h-64' : 'w-32 h-32 md:w-40 md:h-40'} rounded-2xl shadow-xl object-cover scrapbook-rotate-${i % 2 === 0 ? 'right' : 'left'} border-8 border-white`} 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = member.fallback;
                  }}
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className={`font-headline font-bold mb-1 ${member.highlight ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{member.name}</h3>
                <p className="text-secondary text-sm md:text-base font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <p className={`text-on-surface-variant ${member.highlight ? 'text-lg md:text-xl leading-relaxed' : 'text-sm md:text-base'}`}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline font-black text-5xl mb-8">Want to share the road?</h2>
          <p className="text-xl text-on-surface-variant mb-12">
            We're always looking for fellow budget travelers to share their stories. If you have a field guide or a wild travel story, we'd love to hear it.
          </p>
          <button className="bg-primary text-on-primary px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
            Say Hello
          </button>
        </div>
        <div className="absolute top-0 left-0 opacity-5 -translate-x-1/4 -translate-y-1/4">
          <MapPin size={400} />
        </div>
        <div className="absolute bottom-0 right-0 opacity-5 translate-x-1/4 translate-y-1/4">
          <Camera size={400} />
        </div>
      </section>
    </div>
  );
}
