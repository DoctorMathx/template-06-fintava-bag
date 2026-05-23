"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const FREE_SHIPPING = 100000;
  const remaining = Math.max(0, FREE_SHIPPING - subtotal.amount);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-black text-2xl sm:text-3xl uppercase tracking-[0.04em]">Your Bag ({itemCount})</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-14 h-14 text-neutral-200 mx-auto mb-4" />
            <p className="font-bold text-lg uppercase tracking-widest mb-2">Your bag is empty</p>
            <p className="text-neutral-400 text-sm mb-8">Add some luxury to your life</p>
            <Link href="/collections/womens" className="inline-block bg-[#1A1A1A] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {remaining > 0 && (
                <div className="bg-[#F9F6F2] px-5 py-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1A1A1A] transition-all" style={{ width: `${Math.min(100, (subtotal.amount / FREE_SHIPPING) * 100)}%` }} />
                  </div>
                  <p className="text-[11px] text-neutral-600 font-medium flex-shrink-0">
                    Add {formatMoney({ amount: remaining, currency: "NGN" })} more for free delivery
                  </p>
                </div>
              )}

              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-5 pb-6 border-b border-neutral-100">
                  <div className="relative w-24 h-[120px] bg-[#F9F6F2] flex-shrink-0">
                    <Image src={item.image} alt={item.productName} fill className="object-cover object-center"
                      onError={(e) => { const el = e.target as HTMLImageElement; if (!el.src.includes("placeholder-bag.svg")) el.src = "/placeholder-bag.svg"; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2 mb-1">
                      <Link href={`/products/${item.slug}`} className="text-xs font-bold uppercase tracking-[0.08em] text-[#1A1A1A] hover:text-[#C4956A] line-clamp-2 transition-colors">
                        {item.productName}
                      </Link>
                      <button onClick={() => removeItem(item.productId, item.variantId)} className="flex-shrink-0 text-neutral-300 hover:text-neutral-700 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400 mb-3">{item.variantLabel}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-neutral-200">
                        <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-neutral-50 transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-xs font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-neutral-50 transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="text-sm font-bold">{formatMoney({ amount: item.price.amount * item.quantity, currency: "NGN" })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#F9F6F2] p-6 sticky top-24">
                <h2 className="font-bold text-sm uppercase tracking-[0.12em] mb-5">Order Summary</h2>
                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span className="font-semibold">{formatMoney(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span className="font-semibold">{remaining === 0 ? "Free" : "Calculated at checkout"}</span></div>
                </div>
                <div className="border-t border-neutral-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>{formatMoney(subtotal)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="block w-full bg-[#1A1A1A] text-white text-center py-4 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors active:scale-95 flex items-center justify-center gap-2">
                  Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/collections/womens" className="block w-full text-center py-3 text-xs font-medium uppercase tracking-widest text-neutral-500 hover:text-[#1A1A1A] mt-2 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
