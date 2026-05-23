import Link from "next/link";
import { getBestsellerProducts } from "@/mock/products";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedProducts() {
  const products = getBestsellerProducts().slice(0, 4);

  return (
    <section className="py-10 lg:py-14 bg-[#F9F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Our Favourites</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight" style={{ fontWeight: 500 }}>Bestsellers.</h2>
          </div>
          <Link href="/collections/bestsellers" className="hidden sm:block text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-500 hover:text-[#1A1A1A] transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/collections/bestsellers" className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors active:scale-95 inline-block">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
