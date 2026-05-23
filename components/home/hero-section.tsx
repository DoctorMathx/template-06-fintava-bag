import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F9F6F2]" style={{ minHeight: "clamp(520px, 88vh, 900px)" }}>
      {/* Full bleed hero image */}
      <div className="absolute inset-0">
        <Image
          src="/images/PLP_HANDBAGS_HEADER_1.jpg"
          alt="Fintava — For going everywhere"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      </div>

      {/* Content — left aligned, Coach-style */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-full flex items-center" style={{ minHeight: "inherit" }}>
        <div className="max-w-[520px] py-24">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/70 font-semibold mb-5">
            New Season — 2026 Collection
          </p>
          <h1
            className="font-black text-white leading-[1.0] mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            For going<br />everywhere.
          </h1>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-10 max-w-[380px]">
            Premium leather bags crafted for Nigeria&apos;s modern woman and man. Built to last. Designed to turn heads.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/collections/womens"
              className="bg-white text-[#1A1A1A] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#C4956A] hover:text-white transition-colors active:scale-95"
            >
              Shop Women
            </Link>
            <Link
              href="/collections/mens"
              className="border border-white text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-white hover:text-[#1A1A1A] transition-colors active:scale-95"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </div>

      {/* Floating product feature — desktop only */}
      <div className="absolute bottom-8 right-8 hidden lg:block bg-white/90 backdrop-blur-sm p-5 w-52 shadow-xl">
        <p className="text-[9px] uppercase tracking-[0.18em] text-[#C4956A] font-bold mb-1">Featured</p>
        <p className="text-xs font-bold text-[#1A1A1A] leading-snug mb-2">Fintava City Shoulder Bag</p>
        <p className="text-xs text-neutral-500">from ₦185,000</p>
        <Link
          href="/products/fintava-city-shoulder-bag"
          className="mt-3 block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#C4956A] transition-colors"
        >
          Shop Now →
        </Link>
      </div>
    </section>
  );
}
