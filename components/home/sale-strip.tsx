import Link from "next/link";
import Image from "next/image";
import { getSaleProducts } from "@/mock/products";
import { ProductCard } from "@/components/product/product-card";

export function SaleStrip() {
  const products = getSaleProducts().slice(0, 4);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden bg-[#1A1A1A] mb-10" style={{ minHeight: "160px" }}>
          <Image
            src="/images/sale-banner.jpg"
            alt="Sale"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 px-8 sm:px-12 py-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-1">Summer Sale</p>
              <h2 className="font-black text-3xl sm:text-4xl text-white uppercase tracking-[0.02em]">Up to 40% Off.</h2>
            </div>
            <Link
              href="/collections/sale"
              className="flex-shrink-0 border border-white text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-white hover:text-[#1A1A1A] transition-colors active:scale-95"
            >
              Shop All Sale
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
