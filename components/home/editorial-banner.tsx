import Link from "next/link";
import Image from "next/image";

export function EditorialBanner() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">

          {/* Panel 1 — dark/hero */}
          <div className="relative overflow-hidden bg-[#1A1A1A] group" style={{ minHeight: "480px" }}>
            <Image
              src="/images/editorial-womens.jpg"
              alt="Women's Collection"
              fill
              className="object-cover object-center opacity-75 transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">Women&apos;s</p>
              <h3 className="font-black text-2xl sm:text-3xl text-white uppercase leading-tight mb-4">
                Carry the<br />room.
              </h3>
              <Link
                href="/collections/womens"
                className="inline-block border border-white text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] hover:bg-white hover:text-[#1A1A1A] transition-colors active:scale-95"
              >
                Shop Women
              </Link>
            </div>
          </div>

          {/* Right column — two stacked panels */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Panel 2 — cream */}
            <div className="relative overflow-hidden bg-[#F9F6F2] group flex-1" style={{ minHeight: "230px" }}>
              <Image
                src="/images/editorial-mens.jpg"
                alt="Men's Collection"
                fill
                className="object-cover object-center opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">Men&apos;s</p>
                <h3 className="font-black text-xl text-white uppercase mb-3">Made for leaders.</h3>
                <Link
                  href="/collections/mens"
                  className="inline-block bg-white text-[#1A1A1A] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] hover:text-white transition-colors active:scale-95"
                >
                  Shop Men
                </Link>
              </div>
            </div>

            {/* Panel 3 — sale */}
            <div className="relative overflow-hidden bg-[#C4956A] group flex-1" style={{ minHeight: "230px" }}>
              <Image
                src="/images/editorial-sale.jpg"
                alt="Sale"
                fill
                className="object-cover object-center opacity-60 transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#C4956A]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">Limited Time</p>
                <h3 className="font-black text-xl text-white uppercase mb-3">Up to 40% off.</h3>
                <Link
                  href="/collections/sale"
                  className="inline-block bg-[#1A1A1A] text-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:bg-white hover:text-[#1A1A1A] transition-colors active:scale-95"
                >
                  Shop Sale
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
