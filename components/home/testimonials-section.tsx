import { Star } from "lucide-react";

const testimonials = [
  { name: "Adaora N.", location: "Lagos", rating: 5, text: "The Fintava Satchel is worth every kobo. The leather is thick, rich and only gets better with time. I have received nothing but compliments since I started carrying it.", bag: "Fintava Structured Satchel" },
  { name: "Emeka O.", location: "Abuja", rating: 5, text: "I bought the Briefcase for my new role and my colleagues immediately noticed the quality. The laptop compartment is perfectly padded and the leather smells phenomenal.", bag: "Men's Leather Briefcase" },
  { name: "Chidinma A.", location: "Port Harcourt", rating: 5, text: "I was hesitant about the price but the Market Tote has completely replaced my other bags. It fits my laptop, lunch, and still looks polished. Best purchase of 2026.", bag: "Fintava Market Tote" },
  { name: "Yetunde B.", location: "Lagos", rating: 5, text: "The Mini Crossbody is SO cute. I wore it to a wedding and could not put it down — it is the perfect size for the essentials and the chain strap elevates everything.", bag: "Fintava Mini Crossbody" },
];

export function TestimonialsSection() {
  return (
    <section className="py-10 lg:py-14 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-7">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Customer Stories</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white tracking-tight" style={{ fontWeight: 500 }}>What they say.</h2>
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C4956A] text-[#C4956A]" />)}
            <span className="text-white/50 text-xs ml-2">4.9/5 from 2,100+ reviews</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-white/10 p-6">
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#C4956A] text-[#C4956A]" />)}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-[10px] text-white/40">{t.location}</p>
                <p className="text-[10px] text-[#C4956A] mt-1">{t.bag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
