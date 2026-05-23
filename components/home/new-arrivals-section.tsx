import Link from "next/link";
import { getNewArrivals } from "@/mock/products";
import { ProductCard } from "@/components/product/product-card";

export function NewArrivalsSection() {
  const products = getNewArrivals().slice(0, 4);

  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-7">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Just Dropped</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight" style={{ fontWeight: 500 }}>New Arrivals.</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="text-center mt-7">
          <Link
            href="/collections/new-arrivals"
            className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-10 py-3.5 text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#1A1A1A] hover:text-white transition-colors active:scale-95"
          >
            Shop All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
