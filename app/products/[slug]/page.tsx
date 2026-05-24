"use client";

import { useState, use, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart, ShoppingBag, Star, ChevronDown,
  Truck, RotateCcw, Shield, Check,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { getProductBySlug, products } from "@/mock/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";
import { formatMoney, variantLabel } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";
import type { ProductVariant } from "@/lib/types";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0]
  );
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("description");

  const { addItem, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wished = isWishlisted(product.id);

  const discountPct = selectedVariant.compareAtPrice
    ? Math.round((1 - selectedVariant.price.amount / selectedVariant.compareAtPrice.amount) * 100)
    : null;

  const colors = [...new Set(product.variants.map((v) => v.color).filter(Boolean))];
  const sizes = [...new Set(product.variants.map((v) => v.size).filter(Boolean))];
  const related = products
    .filter((p) => p.id !== product.id && p.collections.some((c) => product.collections.includes(c)))
    .slice(0, 4);

  const totalImages = product.images.length;

  const prev = useCallback(() =>
    setActiveImage((i) => (i - 1 + totalImages) % totalImages), [totalImages]);
  const next = useCallback(() =>
    setActiveImage((i) => (i + 1) % totalImages), [totalImages]);

  const handleAdd = () => {
    if (!selectedVariant.available) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity: 1,
      productName: product.name,
      variantLabel: variantLabel(selectedVariant),
      price: selectedVariant.price,
      image: product.images[0],
      slug: product.slug,
    });
    showToast(`${product.name} added to bag`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    openCart();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex gap-2 text-[10px] text-neutral-400 uppercase tracking-[0.1em]">
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections/womens" className="hover:text-[#1A1A1A] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[#1A1A1A] line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-14 xl:gap-20 items-start">

          {/* ── IMAGE GALLERY ─────────────────────────────────── */}
          <div className="w-full">
            {/* Desktop: thumbnail strip left + main image */}
            <div className="hidden sm:flex gap-3">
              {/* Thumbnails */}
              {totalImages > 1 && (
                <div className="flex flex-col gap-2 flex-shrink-0 w-[72px]">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-[72px] h-[88px] overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                        activeImage === i
                          ? "border-[#1A1A1A]"
                          : "border-transparent hover:border-neutral-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover object-center"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image — desktop */}
              <div className="relative flex-1 bg-[#F2EEE8] overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-center transition-opacity duration-300"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg";
                  }}
                />

                {/* Desktop prev / next */}
                {totalImages > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#1A1A1A]" strokeWidth={2} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4 text-[#1A1A1A]" strokeWidth={2} />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                  {product.isNew && (
                    <span className="bg-white text-[#1A1A1A] text-[9px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 shadow-sm">New</span>
                  )}
                  {discountPct && (
                    <span className="bg-[#C4956A] text-white text-[9px] font-bold px-2.5 py-1 shadow-sm">−{discountPct}% Sale</span>
                  )}
                </div>

                {/* Image counter */}
                {totalImages > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] font-semibold px-2.5 py-1 tracking-wide">
                    {activeImage + 1} / {totalImages}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: full-width sliding carousel */}
            <div className="sm:hidden">
              <div className="relative w-full bg-[#F2EEE8] overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-center transition-opacity duration-300"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg";
                  }}
                />

                {/* Mobile badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
                  {product.isNew && (
                    <span className="bg-white text-[#1A1A1A] text-[9px] font-bold uppercase tracking-widest px-2 py-1">New</span>
                  )}
                  {discountPct && (
                    <span className="bg-[#C4956A] text-white text-[9px] font-bold px-2 py-1">−{discountPct}%</span>
                  )}
                </div>

                {/* Mobile prev / next */}
                {totalImages > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 flex items-center justify-center shadow active:scale-90"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 flex items-center justify-center shadow active:scale-90"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </>
                )}
              </div>

              {/* Mobile dot indicators */}
              {totalImages > 1 && (
                <div className="flex justify-center gap-1.5 mt-3">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-full transition-all duration-200 ${
                        activeImage === i ? "w-5 h-1.5 bg-[#1A1A1A]" : "w-1.5 h-1.5 bg-neutral-300"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── PRODUCT DETAILS ───────────────────────────────── */}
          <div className="flex flex-col">
            {product.category && (
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">
                {product.category}
              </p>
            )}

            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] leading-tight tracking-tight" style={{ fontWeight: 600 }}>
                {product.name}
              </h1>
              <button
                onClick={() => {
                  toggle(product.id);
                  showToast(wished ? "Removed from wishlist" : "Saved to wishlist", wished ? "info" : "success");
                }}
                className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all active:scale-90 ${
                  wished
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                    : "border-neutral-200 text-neutral-500 hover:border-[#1A1A1A]"
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-white" : ""}`} strokeWidth={1.5} />
              </button>
            </div>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.round(product.rating!) ? "fill-[#C4956A] text-[#C4956A]" : "text-neutral-200"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-400">
                  {product.rating} ({product.reviewCount?.toLocaleString()} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-neutral-100">
              <span className="font-display text-3xl sm:text-4xl text-[#1A1A1A]" style={{ fontWeight: 700 }}>
                {formatMoney(selectedVariant.price)}
              </span>
              {selectedVariant.compareAtPrice && (
                <>
                  <span className="text-base text-neutral-400 line-through mb-1">
                    {formatMoney(selectedVariant.compareAtPrice)}
                  </span>
                  <span className="text-sm font-bold text-[#C4956A] mb-1">
                    Save {discountPct}%
                  </span>
                </>
              )}
            </div>

            {/* Colour selector */}
            {colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-3">
                  Colour:{" "}
                  <span className="text-[#1A1A1A] normal-case tracking-normal font-bold">
                    {selectedVariant.color}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((color) => {
                    const v = product.variants.find((vv) => vv.color === color);
                    const isSel = selectedVariant.color === color;
                    return (
                      <button
                        key={color}
                        onClick={() => { if (v) setSelectedVariant(v); }}
                        disabled={!v?.available}
                        title={color}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-150 ${
                          isSel
                            ? "border-[#1A1A1A] ring-2 ring-[#1A1A1A] ring-offset-1"
                            : v?.available
                            ? "border-neutral-200 hover:border-neutral-500"
                            : "opacity-25 cursor-not-allowed"
                        }`}
                        style={{ backgroundColor: v?.colorHex ?? "#eee" }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-3">
                  Size:{" "}
                  <span className="text-[#1A1A1A] normal-case tracking-normal font-bold">
                    {selectedVariant.size}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const v = product.variants.find((vv) => vv.size === size);
                    const isSel = selectedVariant.size === size;
                    return (
                      <button
                        key={size}
                        onClick={() => { if (v) setSelectedVariant(v); }}
                        disabled={!v?.available}
                        className={`px-5 py-2.5 text-[11px] border font-bold transition-all uppercase tracking-[0.1em] ${
                          isSel
                            ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                            : v?.available
                            ? "border-neutral-200 text-neutral-700 hover:border-[#1A1A1A]"
                            : "border-neutral-100 text-neutral-300 cursor-not-allowed line-through"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to Bag */}
            <button
              onClick={handleAdd}
              disabled={!selectedVariant.available}
              className={`w-full flex items-center justify-center gap-2.5 py-4 sm:py-5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200 active:scale-[0.99] mb-5 ${
                added
                  ? "bg-emerald-600 text-white"
                  : selectedVariant.available
                  ? "bg-[#1A1A1A] text-white hover:bg-[#C4956A]"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              {added ? (
                <><Check className="w-4 h-4" /> Added to Bag</>
              ) : (
                <><ShoppingBag className="w-4 h-4" />{selectedVariant.available ? "Add to Bag" : "Out of Stock"}</>
              )}
            </button>

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { icon: Truck, text: "Free delivery over ₦100k" },
                { icon: RotateCcw, text: "14-day returns" },
                { icon: Shield, text: "100% genuine leather" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center text-center p-3 bg-[#F9F6F2]">
                  <Icon className="w-4 h-4 text-[#C4956A] mb-1.5" strokeWidth={1.5} />
                  <p className="text-[10px] text-neutral-500 leading-tight">{text}</p>
                </div>
              ))}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { label: "Material", value: product.material },
                { label: "Dimensions", value: product.dimensions },
                { label: "Strap", value: product.strap },
                { label: "Closure", value: product.closure },
              ]
                .filter((s) => s.value)
                .map((s) => (
                  <div key={s.label} className="border border-neutral-100 px-4 py-3">
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-0.5">{s.label}</p>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{s.value}</p>
                  </div>
                ))}
            </div>

            {/* Accordion */}
            <div className="border-t border-neutral-100">
              {[
                { id: "description", title: "Description", content: product.description },
                {
                  id: "care",
                  title: "Care & Maintenance",
                  content: product.careInstructions?.join("\n") ?? "",
                },
                {
                  id: "shipping",
                  title: "Shipping & Delivery",
                  content:
                    "Free delivery on orders above ₦100,000 across Nigeria.\nLagos & Abuja: 1–2 business days.\nOther states: 2–5 business days.\nPay on delivery available in Lagos, Abuja and Port Harcourt.",
                },
              ].map((s) => (
                <div key={s.id} className="border-b border-neutral-100">
                  <button
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                    className="flex items-center justify-between w-full py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A] text-left"
                  >
                    {s.title}
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform flex-shrink-0 ${
                        expanded === s.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expanded === s.id && (
                    <div className="pb-5 text-sm text-neutral-500 leading-relaxed whitespace-pre-line">
                      {s.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-24 pt-12 border-t border-neutral-100">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-1">
                  Explore More
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight" style={{ fontWeight: 500 }}>
                  You may also like.
                </h2>
              </div>
              <Link
                href="/collections/womens"
                className="hidden sm:block text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-400 hover:text-[#1A1A1A] transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
