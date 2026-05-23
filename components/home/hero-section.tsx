import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid lg:grid-cols-2" style={{ minHeight: "clamp(520px, 85vh, 860px)" }}>

        {/* LEFT — editorial dark panel */}
        <div className="bg-[#111111] flex items-center order-2 lg:order-1 px-8 sm:px-12 lg:px-16 xl:px-20 py-14 lg:py-0">
          <div className="max-w-[440px] w-full">
            <p className="text-[10px] uppercase tracking-[0.30em] text-[#C4956A] font-bold mb-5">
              2026 Collection
            </p>
            <h1
              className="font-black text-white uppercase leading-[0.9] mb-6"
              style={{ fontSize: "clamp(2.8rem, 4.8vw, 4.8rem)", letterSpacing: "-0.02em" }}
            >
              Crafted for<br />every<br />chapter.
            </h1>
            <div className="w-10 h-[2px] bg-[#C4956A] mb-6" />
            <p className="text-white/50 text-[13px] leading-[1.8] mb-10 max-w-[310px]">
              Premium leather goods for Nigeria&apos;s modern woman and man. Built to last. Designed to turn heads.
            </p>
            <Link
              href="/collections/womens"
              className="inline-block bg-white text-[#111111] px-10 py-4 text-[11px] font-black uppercase tracking-[0.20em] hover:bg-[#C4956A] hover:text-white transition-all duration-200 active:scale-95"
            >
              Shop the Collection
            </Link>

            {/* stats row */}
            <div className="flex gap-8 mt-12 pt-10 border-t border-white/10">
              {[["12+", "Bag Styles"], ["100%", "Genuine Leather"], ["₦0", "Delivery 100k+"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-white font-black text-lg leading-none">{val}</p>
                  <p className="text-white/35 text-[10px] uppercase tracking-widest mt-1">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — hero image */}
        <div className="relative order-1 lg:order-2 overflow-hidden bg-[#EDE8E1]" style={{ minHeight: "clamp(300px, 50vw, 860px)" }}>
          <Image
            src="/images/hero-bags-editorial.png"
            alt="Fintava — Premium leather bags"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Floating featured card — bottom left of image */}
          <div className="absolute bottom-6 left-6 hidden lg:block bg-white/95 backdrop-blur-sm p-5 w-52 shadow-2xl">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#C4956A] font-bold mb-1">Featured Drop</p>
            <p className="text-xs font-bold text-[#1A1A1A] leading-snug mb-2">Fintava City Shoulder Bag</p>
            <p className="text-xs text-neutral-500">from ₦185,000</p>
            <Link
              href="/products/fintava-city-shoulder-bag"
              className="mt-3 block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#C4956A] transition-colors"
            >
              Shop Now →
            </Link>
          </div>

          {/* "New" badge — top right */}
          <div className="absolute top-6 right-6 bg-[#C4956A] text-white text-[9px] font-black uppercase tracking-[0.18em] px-3 py-2">
            New Season
          </div>
        </div>
      </div>
    </section>
  );
}
