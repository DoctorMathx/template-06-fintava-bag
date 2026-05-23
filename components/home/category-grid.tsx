import Link from "next/link";
import Image from "next/image";
import { categoryTiles } from "@/mock/navigation";

export function CategoryGrid() {
  return (
    <section className="py-10 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Explore</p>
            <h2 className="font-black text-2xl sm:text-3xl text-[#1A1A1A] uppercase tracking-[0.04em]">Shop by Category</h2>
          </div>
          <Link href="/collections/womens" className="hidden sm:block text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-500 hover:text-[#1A1A1A] transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoryTiles.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="group relative overflow-hidden bg-[#F9F6F2]"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-[11px] uppercase tracking-[0.12em]">{tile.label}</p>
                <p className="text-white/60 text-[10px] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wider">
                  Shop →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
