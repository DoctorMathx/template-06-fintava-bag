"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/mock/products";
import { ProductCard } from "@/components/product/product-card";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlisted = products.filter((p) => ids.has(p.id));

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-black text-2xl sm:text-3xl uppercase tracking-[0.04em]">Wishlist ({ids.size})</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlisted.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
            <p className="font-bold uppercase tracking-widest text-sm mb-2">Your wishlist is empty</p>
            <p className="text-sm text-neutral-400 mb-8">Save the pieces you love — they&apos;ll be waiting here for you.</p>
            <Link href="/collections/womens" className="inline-block bg-[#1A1A1A] text-white px-10 py-3.5 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors">
              Explore Bags
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlisted.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
