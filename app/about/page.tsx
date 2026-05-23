import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Our Story</p>
          <h1 className="font-black text-4xl sm:text-5xl text-white uppercase tracking-[0.04em]">About Fintava</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-10">
        <div>
          <h2 className="font-black text-xl uppercase tracking-[0.06em] mb-4 text-[#1A1A1A]">Why Fintava</h2>
          <p className="text-neutral-600 leading-relaxed text-sm">
            Fintava was born from a simple belief: that Nigerian women and men deserve access to world-class leather goods, crafted to the highest standards, without compromise. We saw a gap — a market full of mass-produced pieces that degraded quickly, at prices that didn&apos;t reflect their quality. Fintava exists to change that.
          </p>
        </div>
        <div>
          <h2 className="font-black text-xl uppercase tracking-[0.06em] mb-4 text-[#1A1A1A]" id="story">Our Craft</h2>
          <p className="text-neutral-600 leading-relaxed text-sm">
            Every Fintava bag begins with premium leather — full-grain, pebble, or soft grained — sourced from the world&apos;s finest tanneries. Our artisans shape, stitch, and finish each piece with meticulous attention to detail. From the weight of the hardware to the alignment of every seam, nothing is an afterthought.
          </p>
        </div>
        <div>
          <h2 className="font-black text-xl uppercase tracking-[0.06em] mb-4 text-[#1A1A1A]" id="sustainability">Sustainability</h2>
          <p className="text-neutral-600 leading-relaxed text-sm">
            We believe in longevity over trends. A Fintava bag is not seasonal — it is for life. By designing with durability at the core, we encourage our customers to invest in fewer, better things. We are committed to responsible sourcing and packaging that minimises waste.
          </p>
        </div>
        <div className="text-center pt-6">
          <Link href="/collections/womens" className="inline-block bg-[#1A1A1A] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors">
            Explore the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
