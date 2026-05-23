"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { formatMoney, variantLabel } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/types";

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

export function QuickViewModal({ product, onClose, onAddToCart }: Props) {
  const [selected, setSelected] = useState<ProductVariant>(
    product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0]
  );
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = () => {
    if (!selected.available) return;
    addItem({
      productId: product.id,
      variantId: selected.id,
      quantity: 1,
      productName: product.name,
      variantLabel: variantLabel(selected),
      price: selected.price,
      image: product.images[0],
      slug: product.slug,
    });
    showToast(`${product.name} added to bag`);
    onAddToCart();
  };

  const colors = [...new Set(product.variants.map((v) => v.color).filter(Boolean))];

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 text-neutral-400 hover:text-[#1A1A1A] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid sm:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#F9F6F2]" style={{ aspectRatio: "3/4" }}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover object-center"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg";
              }}
            />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {product.category && (
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#C4956A] font-bold mb-2">{product.category}</p>
              )}
              <h2 className="font-bold text-lg text-[#1A1A1A] leading-snug mb-1">{product.name}</h2>

              {product.rating && (
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating!) ? "fill-[#C4956A] text-[#C4956A]" : "text-neutral-200"}`} />
                  ))}
                  <span className="text-xs text-neutral-400 ml-1">({product.reviewCount?.toLocaleString()})</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <span className="font-bold text-xl text-[#1A1A1A]">{formatMoney(selected.price)}</span>
                {selected.compareAtPrice && (
                  <span className="text-sm text-neutral-400 line-through">{formatMoney(selected.compareAtPrice)}</span>
                )}
              </div>

              <p className="text-sm text-neutral-500 leading-relaxed mb-5">{product.shortDescription}</p>

              {/* Color picker */}
              {colors.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 font-semibold mb-2">
                    Colour: <span className="text-[#1A1A1A] normal-case tracking-normal font-bold">{selected.color}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => {
                      const v = product.variants.find((vv) => vv.color === color);
                      const isSelected = selected.color === color;
                      return (
                        <button
                          key={color}
                          onClick={() => { if (v) setSelected(v); }}
                          disabled={!v?.available}
                          title={color}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${isSelected ? "border-[#1A1A1A] scale-110" : v?.available ? "border-neutral-200 hover:border-neutral-400" : "opacity-30 cursor-not-allowed"}`}
                          style={{ backgroundColor: v?.colorHex ?? "#eee" }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Specs */}
              <div className="space-y-1.5 border-t border-neutral-100 pt-4">
                {product.material && <div className="flex justify-between text-xs"><span className="text-neutral-400">Material</span><span className="font-medium">{product.material}</span></div>}
                {product.dimensions && <div className="flex justify-between text-xs"><span className="text-neutral-400">Dimensions</span><span className="font-medium">{product.dimensions}</span></div>}
                {product.strap && <div className="flex justify-between text-xs"><span className="text-neutral-400">Strap</span><span className="font-medium">{product.strap}</span></div>}
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <button
                onClick={handleAdd}
                disabled={!selected.available}
                className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3.5 text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#C4956A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                {selected.available ? "Add to Bag" : "Out of Stock"}
              </button>
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="block w-full text-center text-xs text-neutral-500 hover:text-[#1A1A1A] uppercase tracking-widest transition-colors py-1"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
