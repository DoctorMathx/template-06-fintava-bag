"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeCart} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[420px] bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
            <h2 className="font-bold text-sm uppercase tracking-[0.12em]">Your Bag ({itemCount})</h2>
          </div>
          <button onClick={closeCart} className="p-1 hover:text-[#C4956A] transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag className="w-12 h-12 text-neutral-200" />
              <div>
                <p className="font-semibold text-sm uppercase tracking-widest">Your bag is empty</p>
                <p className="text-xs text-neutral-400 mt-1">Add some luxury to your day</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 border border-[#1A1A1A] text-[#1A1A1A] px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-neutral-50 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover object-center"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.06em] text-[#1A1A1A] hover:text-[#C4956A] line-clamp-2 transition-colors"
                        onClick={closeCart}
                      >
                        {item.productName}
                      </Link>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="flex-shrink-0 text-neutral-300 hover:text-neutral-700 transition-colors"
                        aria-label="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{item.variantLabel}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200">
                        <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="px-2 py-1 hover:bg-neutral-50 transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-xs font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="px-2 py-1 hover:bg-neutral-50 transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="text-xs font-bold text-[#1A1A1A]">
                        {formatMoney({ amount: item.price.amount * item.quantity, currency: "NGN" })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-100 px-6 py-5 space-y-3 bg-[#F9F6F2]">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest text-neutral-500">Subtotal</span>
              <span className="font-bold text-base text-[#1A1A1A]">{formatMoney(subtotal)}</span>
            </div>
            <p className="text-[11px] text-neutral-400">Shipping calculated at checkout. Free above ₦100,000.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#1A1A1A] text-white text-center py-3.5 text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#C4956A] transition-colors active:scale-95"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-neutral-200 text-center py-3 text-xs font-medium text-neutral-600 uppercase tracking-widest hover:border-[#1A1A1A] transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
