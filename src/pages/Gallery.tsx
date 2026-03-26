import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Gallery() {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCpdfa8_M5lgHQlBfLwhe0FfO6tKpTzahSszO33t2UAabtofJxjN2xmOpTFO8p4EWuEyes-Z5ztv-qTbm3idUjwfJEqLETZIS_J7hrGWv9-5-qV3cXEaD3R1BGCAdf3VaqAKW7fXYlRnZqJXDwbMvB46q5qV_zELQuGwOkBbVhQBmSelLseiADXqGJZeM23nODGPbtK1HtGGclgmyv_BV6G08av52m-y11Q7SNYL15psJeuP4RdJtZe8rcFEMjP4-ABCfpasbfRJKo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvxrbBgrC7lOtYAoJe4O4OacTKIysL1TJUrnstqodGrztv4BhvDTg3Dp29fpiR_esvT3kT181l6Pm_Mx9UlwtU-uNwZCOMABintVkY0q8_BI-0_6XCfay4wNQsYNXZw_5nx5IMjnHzgsFliqo40YsxSnuVvp48lxFGYexkaMvHxTs0YtAE_h6bqftRQlNzpcA1bKRvCHD6lh_p27chXRAR0EZ32tyL7gDIAoDWv8czCqBI1L90oUW4jgLCs6INQDrmhfep9EEkWEE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAmFtc68lsEEvjWWqriFNM7irvoSWrTNlNJvT2eaKkE9asIwK1DBHXqlqW6gSXEJl27oPv_8IfGbAnJruyRU5MpycdXJAu7XAtBMGRQ2-QPlS3Ug6WYXC5WORkWvv4iddwj_M_KE5c4--VbJw9wp9EXxLHQg3olAgzVSDihGhjHxucNaP6nuBMNo08peiBpgSuhHviDwleex6ZqukoFyQdm1IPOc55zziIjfKdxGxWPCBUqYvt1PMRtf20tw_kAPBCpS9Djtm5X3wo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC6XNnzd9GAbEiXQ0nvGbscSwKr_-AoM72ci1h96D8vHDOOMEgeeEroycCYymB2yQ6TzWUGhcNGUBaiwd97TNRV-lX9CI0zUjBPhofeftASqLtwYORYHrb5grosX9ZlCUB_MEyly_x8cs51hN0M68nn2Kj74AkD0jkrmARZwaluEkH8Hx2nARyFYNsOIv3lMp0iVavlag2gsFvIxjuvxSkto7oHjdmhLeFpv7DVCFnpjqnsrKvAxiKPSB8v12mjA02OOHsD4kB6Gc8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA_xN_lwBA7c6oOvFsyxOe7wzkUiE4tuOlVngqa2_alhR-vJPW4G6qNPsZr8CPj8BJuKcKjvSz9s1k33Q9XSYYY3QRqP8iKLJ2Kzbgo0oQLcMdpaEiTRvLsFqba5_jzBgGgoRjB2AerSDcRDxcH1Hy9hCxIXVgP-zAE9xJyH6QJbXv13hM9k_cZ4rXQpbproTHVoNldBA6GAuR4DeLy2yT22wAiY744yzEBfEXcevo678JzcHt5c0PjbrcD2sS7oR0pWp_e8-2Yi3Y",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAPHEpgKb0E1MM_LN9RkTaq2YISGS4bsSlFWxSVQ6dmOA-o0smpAION7afztuNMM-73jVuzwhVYprk-NwTbJgSbTD9bGQkhKmcgZ83nUkDJYTsgQomEegOxuOkyo2H8v1Ngef3gzWxQJ0Jw9921sjDUrqYLIva-pQeeAykMg11r5rVeLJqr3Ie4jLJQJjZP4qWBILBdfjfvESKf_NQZvpdqO14q04NBcD-_yXnhm3eRQnyeR7naMKHKwSkE1M_nmvvsCJoiyyxYmAI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBv2JBGSH40VdVievnyKg4R6z-EuHQPhZvV3Y3XpLsbziaRf8EPPjciOZARfNPK2Cv48G6GjdAvm2eU6OVlkwPBXE7W64aEXj-Zd6iCP_rTbxagjsNtFwYr26xzIeryLDPWoVXJtXwT87OkCSWRQsn1SSMSwcNSrKZ3paGZueF-n0UjJk8xXkOL0tw9wyYpjB4xvedopkrCb_hv8zrOvsC1O6DBremB5RtjdASquc3Wq9Y2DwAIfQw93bxfCi37HTeM0RuImQ91060",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDXxUGsoo4u2bmhRWQy-HTx2QFcbbPPMBPSMahRFQqJdAGKFLOrJ-GSDAYHvPmpQ_RwBdEPNUzcRaB_T_2F62Hyutmbw6xKvjSyIowXlRlLgw4cFW8tEFf1Nb947r9d6waKqfemNhS4BifbiwZWOGGkG-Jhbf0j72S68Iul5yGKtw_S3UBaZbAb-sH3pNVUz9cRf036642YYan5fKj3fNFUpZcbuipvo4VEuZHBnnI1LyFtw453IGecNyxe1sk71yiKPttMX06oQpQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDoaFEQUjqqilibS-yMPUgCCtbDME01biIOTjZhOOZ8MAxwoPIQD-CAU_QsI6bONmH9c0UKuIL6inQEqAOZn4AcAf6tan6COhmeBTfKzF0AhbLonM8QQjlCVyiXuNWeJ8gr-wPRWf2Y1U0zABUTXLPVL4xkERQKX0JbQIzUEERFKEVp7a_KwvJQ5nPTNPLo2XhZDfhJp8CroY8_b4Qgs_Jgf3LX1XTbUdvnI5wSLd9QWMEBOArtv5Q0LMhRkzjxDZD1xGxKEHSKm6k"
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <header className="mb-24 text-center">
        <span className="font-bold text-sm uppercase tracking-[0.2em] text-secondary mb-4 block">The Visual Journal</span>
        <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface mb-6 tracking-tight">Captured Moments.</h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">
          A collective scrapbook of intentional travel. These are the views, streets, and stories shared by our global community of explorers.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {["All Stories", "Nature", "Urban", "Street Food", "Hidden Gems"].map((cat, i) => (
          <button 
            key={cat}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              i === 0 ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-secondary-container hover:text-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className={`relative overflow-hidden rounded-xl bg-surface-container shadow-sm transition-transform ${
              i % 3 === 0 ? "rotate-[-1deg]" : i % 3 === 1 ? "rotate-[1deg]" : ""
            }`}
          >
            <img 
              src={src} 
              alt={`Gallery item ${i}`} 
              className="w-full h-auto object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-white font-headline font-bold text-xl">Moment #{i + 1}</p>
              <p className="text-white/80 text-sm uppercase tracking-widest">Digital Scrapbook</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <button className="inline-flex items-center gap-3 px-10 py-4 bg-surface-container text-primary font-headline font-bold text-lg rounded-full hover:scale-105 active:scale-95 transition-all">
          Load More Memories
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
}
