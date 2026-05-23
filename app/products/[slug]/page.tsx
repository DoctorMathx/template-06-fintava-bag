"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ShoppingBag, Star, ChevronDown, Truck, RotateCcw, Shield, Check } from "lucide-react";
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
  const related = products.filter((p) => p.id !== product.id && p.collections.some((c) => product.collections.includes(c))).slice(0, 4);

  const handleAdd = () => {
    if (!selectedVariant.available) return;
    addItem({ productId: product.id, variantId: selectedVariant.id, quantity: 1, productName: product.name, variantLabel: variantLabel(selectedVariant), price: selectedVariant.price, image: product.images[0], slug: product.slug });
    showToast(`${product.name} added to bag`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex gap-2 text-[10px] text-neutral-400 uppercase tracking-[0.1em]">
            <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
            <span>/</span>
            <Link href="/collections/womens" className="hover:text-[#1A1A1A]">Shop</Link>
            <span>/</span>
            <span className="text-[#1A1A1A] line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">
          {/* Images */}
          <div className="flex gap-3">
            {product.images.length > 1 && (
              <div className="hidden sm:flex flex-col gap-2 w-14 flex-shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-14 h-[70px] overflow-hidden border transition-all ${activeImage === i ? "border-[#1A1A1A]" : "border-neutral-100 hover:border-neutral-300"}`}
                  >
                    <Image src={img} alt="" fill className="object-cover object-center"
                      onError={(e) => { const el = e.target as HTMLImageElement; if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg"; }}
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="flex-1 relative bg-[#F9F6F2]" style={{ aspectRatio: "3/4" }}>
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
                onError={(e) => { const el = e.target as HTMLImageElement; if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg"; }}
              />
              {discountPct && (
                <div className="absolute top-4 left-4 bg-[#C4956A] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  -{discountPct}% Sale
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  New
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4956A] font-bold mb-2">{product.category}</p>
            )}
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-black text-2xl sm:text-3xl text-[#1A1A1A] leading-snug uppercase tracking-[0.02em]">{product.name}</h1>
              <button
                onClick={() => { toggle(product.id); showToast(wished ? "Removed from wishlist" : "Saved to wishlist", wished ? "info" : "success"); }}
                className={`flex-shrink-0 w-10 h-10 border flex items-center justify-center transition-all active:scale-90 ${wished ? "border-[#1A1A1A] bg-[#1A1A1A] text-white" : "border-neutral-200 text-neutral-500 hover:border-[#1A1A1A]"}`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-white" : ""}`} />
              </button>
            </div>

            {product.rating && (
              <div className="flex items-center gap-1.5 mt-3 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating!) ? "fill-[#C4956A] text-[#C4956A]" : "text-neutral-200"}`} />)}
                </div>
                <span className="text-xs text-neutral-500">{product.rating} ({product.reviewCount?.toLocaleString()} reviews)</span>
              </div>
            )}

            <div className="flex items-end gap-3 mb-6">
              <span className="font-black text-3xl text-[#1A1A1A]">{formatMoney(selectedVariant.price)}</span>
              {selectedVariant.compareAtPrice && (
                <><span className="text-base text-neutral-400 line-through">{formatMoney(selectedVariant.compareAtPrice)}</span>
                <span className="text-sm font-bold text-[#C4956A]">Save {discountPct}%</span></>
              )}
            </div>

            {/* Colour */}
            {colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-2.5">
                  Colour: <span className="text-[#1A1A1A] normal-case tracking-normal font-bold">{selectedVariant.color}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => {
                    const v = product.variants.find((vv) => vv.color === color);
                    const isSel = selectedVariant.color === color;
                    return (
                      <button
                        key={color}
                        onClick={() => { if (v) setSelectedVariant(v); }}
                        disabled={!v?.available}
                        title={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${isSel ? "border-[#1A1A1A] ring-1 ring-[#1A1A1A] ring-offset-1" : v?.available ? "border-neutral-200 hover:border-neutral-500" : "opacity-30 cursor-not-allowed"}`}
                        style={{ backgroundColor: v?.colorHex ?? "#eee" }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-2.5">
                  Size: <span className="text-[#1A1A1A] normal-case tracking-normal font-bold">{selectedVariant.size}</span>
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
                        className={`px-4 py-2 text-xs border font-semibold transition-all uppercase tracking-widest ${isSel ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : v?.available ? "border-neutral-200 text-neutral-700 hover:border-[#1A1A1A]" : "border-neutral-100 text-neutral-300 cursor-not-allowed line-through"}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to bag */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAdd}
                disabled={!selectedVariant.available}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-[0.14em] transition-all active:scale-95 ${added ? "bg-emerald-600 text-white" : selectedVariant.available ? "bg-[#1A1A1A] text-white hover:bg-[#C4956A]" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"}`}
              >
                {added ? <><Check className="w-4 h-4" /> Added!</> : <><ShoppingBag className="w-4 h-4" />{selectedVariant.available ? "Add to Bag" : "Out of Stock"}</>}
              </button>
            </div>

            {/* Bag specs */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, text: "Free delivery over ₦100k" },
                { icon: RotateCcw, text: "14-day returns" },
                { icon: Shield, text: "100% genuine leather" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center text-center p-3 border border-neutral-100">
                  <Icon className="w-4 h-4 text-[#C4956A] mb-1.5" />
                  <p className="text-[10px] text-neutral-500 leading-tight">{text}</p>
                </div>
              ))}
            </div>

            {/* Product details */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { label: "Material", value: product.material },
                { label: "Dimensions", value: product.dimensions },
                { label: "Strap", value: product.strap },
                { label: "Closure", value: product.closure },
              ].filter((s) => s.value).map((s) => (
                <div key={s.label} className="bg-[#F9F6F2] px-4 py-3">
                  <p className="text-[9px] uppercase tracking-widest text-neutral-400">{s.label}</p>
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Accordion */}
            {[
              { id: "description", title: "Description", content: product.description },
              { id: "care", title: "Care & Maintenance", content: product.careInstructions?.join("\n") ?? "" },
              { id: "shipping", title: "Shipping & Delivery", content: "Free delivery on orders above ₦100,000 across Nigeria. Lagos & Abuja: 1–2 business days. Other states: 2–5 business days. Pay on delivery available in Lagos, Abuja and Port Harcourt." },
            ].map((s) => (
              <div key={s.id} className="border-t border-neutral-100">
                <button
                  onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                  className="flex items-center justify-between w-full py-4 text-xs font-bold uppercase tracking-[0.1em] text-left"
                >
                  {s.title}
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${expanded === s.id ? "rotate-180" : ""}`} />
                </button>
                {expanded === s.id && (
                  <div className="pb-4 text-sm text-neutral-500 leading-relaxed whitespace-pre-line">{s.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-neutral-100 pt-16">
            <div className="text-center mb-10">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Explore More</p>
              <h2 className="font-black text-2xl text-[#1A1A1A] uppercase tracking-[0.04em]">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
