"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, Star } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";
import { useCart } from "@/lib/cart-context";
import { formatMoney, variantLabel } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { QuickViewModal } from "./quick-view-modal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const { addItem, openCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const wished = isWishlisted(product.id);
  const defaultVariant = product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0];
  const discountPct = defaultVariant.compareAtPrice
    ? Math.round((1 - defaultVariant.price.amount / defaultVariant.compareAtPrice.amount) * 100)
    : null;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    showToast(wished ? "Removed from wishlist" : `Saved to wishlist`, wished ? "info" : "success");
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant.available) return;
    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      quantity: 1,
      productName: product.name,
      variantLabel: variantLabel(defaultVariant),
      price: defaultVariant.price,
      image: product.images[0],
      slug: product.slug,
    });
    showToast(`${product.name} added to bag`);
    openCart();
  };

  const activeImg = hovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <>
      <div
        className="group relative flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-[#F9F6F2]" style={{ aspectRatio: "3/4" }}>
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <Image
              src={activeImg}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg";
              }}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
                New
              </span>
            )}
            {discountPct && (
              <span className="bg-[#C4956A] text-white text-[9px] font-bold px-2.5 py-1">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all active:scale-90 ${
              wished ? "text-[#1A1A1A] bg-white" : "bg-white/80 text-neutral-600 hover:text-[#1A1A1A] opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wished ? "fill-[#1A1A1A]" : ""}`} />
          </button>

          {/* Quick View — desktop hover */}
          <button
            onClick={(e) => { e.preventDefault(); setQuickViewOpen(true); }}
            className="absolute bottom-3 right-3 bg-white/90 p-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:bg-white hidden sm:flex items-center justify-center"
            aria-label="Quick view"
          >
            <Eye className="w-3.5 h-3.5 text-[#1A1A1A]" />
          </button>

          {/* Quick Add — desktop slide up */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
            <button
              onClick={handleQuickAdd}
              disabled={!defaultVariant.available}
              className="w-full bg-[#1A1A1A] text-white py-3 text-[10px] font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors disabled:opacity-50 active:scale-95"
            >
              {defaultVariant.available ? "Quick Add" : "Out of Stock"}
            </button>
          </div>

          {/* Quick Add — mobile always visible */}
          <div className="absolute bottom-0 left-0 right-0 sm:hidden">
            <button
              onClick={handleQuickAdd}
              disabled={!defaultVariant.available}
              className="w-full bg-[#1A1A1A]/85 text-white py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors disabled:opacity-50 active:scale-95"
            >
              {defaultVariant.available ? "Add to Bag" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 flex-1">
          {product.category && (
            <p className="text-[9px] text-neutral-400 uppercase tracking-[0.16em] mb-1">{product.category}</p>
          )}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:text-[#C4956A] transition-colors leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Color swatches */}
          {product.variants.length > 1 && (
            <div className="flex gap-1 mt-2">
              {product.variants.slice(0, 5).map((v) => v.colorHex && (
                <div
                  key={v.id}
                  className="w-3.5 h-3.5 rounded-full border border-neutral-200"
                  style={{ backgroundColor: v.colorHex }}
                  title={v.color}
                />
              ))}
              {product.variants.length > 5 && <span className="text-[9px] text-neutral-400 self-center">+{product.variants.length - 5}</span>}
            </div>
          )}

          {product.rating && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(product.rating!) ? "fill-[#C4956A] text-[#C4956A]" : "text-neutral-200"}`} />
              ))}
              <span className="text-[10px] text-neutral-400 ml-0.5">({product.reviewCount?.toLocaleString()})</span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-bold text-[#1A1A1A]">{formatMoney(defaultVariant.price)}</span>
            {defaultVariant.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">{formatMoney(defaultVariant.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
          onAddToCart={() => { openCart(); setQuickViewOpen(false); }}
        />
      )}
    </>
  );
}
