import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#EDE8E1]">
      {/* Full-bleed image */}
      <div className="relative w-full" style={{ height: "clamp(560px, 78vh, 820px)" }}>
        <Image
          src="/images/hero-bags-editorial.png"
          alt="Fintava — Premium leather bags"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Soft gradient on bottom-left only — preserves the natural image elsewhere */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-transparent lg:from-black/45 lg:via-transparent" />

        {/* Eyebrow — top center, Coach-style mini-headline */}
        <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white/85 text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-medium">
            The New Season
          </p>
        </div>

        {/* Main content — bottom-left aligned, Coach-style */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-xl">
              <h1
                className="font-display text-white leading-[0.95] mb-6 sm:mb-8"
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                Carry your<br />
                <em className="italic font-light text-white">story</em>.
              </h1>
              <p className="text-white/85 text-[13px] sm:text-sm leading-[1.7] mb-7 sm:mb-9 max-w-[380px] font-light">
                Premium leather bags, handcrafted for the discerning Nigerian. Built to last. Designed to be loved.
              </p>
              <Link
                href="/collections/womens"
                className="inline-block bg-white text-[#1A1A1A] px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-[#C4956A] hover:text-white transition-all duration-300 active:scale-95"
              >
                Shop the Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Coach-style tickers below image */}
      <div className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
          {[
            ["Complimentary Delivery", "On orders above ₦100,000"],
            ["100% Genuine Leather", "Crafted to last a lifetime"],
            ["14-Day Returns", "Free, easy & hassle-free"],
            ["FintavaPay Secure", "Encrypted checkout"],
          ].map(([title, sub]) => (
            <div key={title} className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white">{title}</span>
              <span className="text-[9px] sm:text-[10px] text-white/45 mt-0.5">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
