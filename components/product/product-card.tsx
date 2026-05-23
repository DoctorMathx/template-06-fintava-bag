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
    showToast(wished ? "Removed from wishlist" : "Saved to wishlist", wished ? "info" : "success");
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

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const activeImg = hovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <>
      <div
        className="group relative flex flex-col w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container — strict aspect ratio, all overlays contained */}
        <Link
          href={`/products/${product.slug}`}
          className="relative block w-full overflow-hidden bg-[#F2EEE8]"
          style={{ aspectRatio: "4 / 5" }}
        >
          <Image
            src={activeImg}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg";
            }}
          />

          {/* Badges — top-left, stacked */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.isNew && (
              <span className="bg-white text-[#1A1A1A] text-[9px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 shadow-sm">
                New
              </span>
            )}
            {discountPct && (
              <span className="bg-[#1A1A1A] text-white text-[9px] font-bold tracking-wider px-2.5 py-1 shadow-sm">
                −{discountPct}%
              </span>
            )}
          </div>

          {/* Wishlist — top-right, always visible */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 z-10 ${
              wished
                ? "bg-[#1A1A1A] text-white"
                : "bg-white/95 text-[#1A1A1A] hover:bg-white shadow-sm"
            }`}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${wished ? "fill-white" : ""}`} strokeWidth={1.5} />
          </button>

          {/* Quick View — visible only on hover (desktop) */}
          <button
            onClick={handleQuickView}
            className="absolute top-14 right-3 w-9 h-9 rounded-full bg-white/95 text-[#1A1A1A] hover:bg-white shadow-sm flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 active:scale-90 z-10 hidden sm:flex"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" strokeWidth={1.5} />
          </button>

          {/* Quick Add bar — slides up on hover (desktop only) */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block z-10">
            <button
              onClick={handleQuickAdd}
              disabled={!defaultVariant.available}
              className="w-full bg-[#1A1A1A] text-white py-3 text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-[#C4956A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {defaultVariant.available ? "+ Add to Bag" : "Out of Stock"}
            </button>
          </div>
        </Link>

        {/* Info — clean, contained, balanced spacing */}
        <div className="mt-3 sm:mt-4 flex flex-col gap-1">
          {product.category && (
            <p className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.18em] font-medium">
              {product.category}
            </p>
          )}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-[13px] sm:text-sm font-semibold text-[#1A1A1A] hover:text-[#C4956A] transition-colors leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Color swatches */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mt-1">
              {product.variants.slice(0, 4).map((v) =>
                v.colorHex ? (
                  <span
                    key={v.id}
                    className="w-3 h-3 rounded-full border border-neutral-200"
                    style={{ backgroundColor: v.colorHex }}
                    title={v.color}
                  />
                ) : null
              )}
              {product.variants.length > 4 && (
                <span className="text-[9px] text-neutral-400">+{product.variants.length - 4}</span>
              )}
            </div>
          )}

          {product.rating && (
            <div className="flex items-center gap-1 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.round(product.rating!) ? "fill-[#C4956A] text-[#C4956A]" : "text-neutral-200"
                  }`}
                />
              ))}
              <span className="text-[10px] text-neutral-400 ml-0.5">({product.reviewCount?.toLocaleString()})</span>
            </div>
          )}

          {/* Price row — mobile-friendly with inline + button */}
          <div className="flex items-center justify-between gap-2 mt-1.5">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-sm sm:text-[15px] font-bold text-[#1A1A1A] tabular-nums">
                {formatMoney(defaultVariant.price)}
              </span>
              {defaultVariant.compareAtPrice && (
                <span className="text-[11px] text-neutral-400 line-through tabular-nums">
                  {formatMoney(defaultVariant.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Mobile-only inline add button (desktop uses slide-up) */}
            <button
              onClick={handleQuickAdd}
              disabled={!defaultVariant.available}
              className="sm:hidden flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#C4956A] transition-colors active:scale-90 disabled:opacity-40"
              aria-label="Add to bag"
            >
              <span className="text-base leading-none -mt-0.5">+</span>
            </button>
          </div>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
          onAddToCart={() => {
            openCart();
            setQuickViewOpen(false);
          }}
        />
      )}
    </>
  );
}
