"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const NIGERIAN_STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "" });
  const [payment, setPayment] = useState("card");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const shipping = subtotal.amount >= 100000 ? 0 : 5000;
  const total = subtotal.amount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0 && step !== 2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4">Your bag is empty</p>
          <Link href="/collections/womens" className="bg-[#1A1A1A] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#C4956A] transition-colors inline-block">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F2]">
      <div className="bg-white border-b border-neutral-100 px-4 py-4 text-center">
        <Link href="/" className="font-black text-xl tracking-[0.06em] text-[#1A1A1A]">FINTAVA</Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-10">
        {/* Form */}
        <div>
          <div className="flex gap-4 mb-8">
            {["Shipping", "Payment"].map((s, i) => (
              <button key={s} onClick={() => { if (i + 1 < step) setStep(i + 1); }}
                className={`text-[10px] uppercase tracking-[0.14em] font-bold pb-2 border-b-2 transition-colors ${step === i + 1 ? "border-[#1A1A1A] text-[#1A1A1A]" : step > i + 1 ? "border-[#C4956A] text-[#C4956A] cursor-pointer" : "border-transparent text-neutral-400"}`}>
                {i + 1}. {s}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <h2 className="font-bold text-sm uppercase tracking-[0.12em] mb-4">Contact & Shipping</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[["First Name","firstName"],["Last Name","lastName"]].map(([label, key]) => (
                    <div key={key}>
                      <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">{label}</label>
                      <input required value={form[key as keyof typeof form]} onChange={(e) => set(key, e.target.value)} className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] bg-white" />
                    </div>
                  ))}
                </div>
                {[["Email","email","email"],["Phone","phone","tel"],["Street Address","address","text"],["City","city","text"]].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">{label}</label>
                    <input required type={type} value={form[key as keyof typeof form]} onChange={(e) => set(key, e.target.value)} className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] bg-white" />
                  </div>
                ))}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">State</label>
                  <select required value={form.state} onChange={(e) => set("state", e.target.value)} className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] bg-white appearance-none">
                    <option value="">Select state</option>
                    {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-9 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
                <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors active:scale-95">
                  Continue to Payment
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="font-bold text-sm uppercase tracking-[0.12em] mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[["card","Pay by Card"],["transfer","Bank Transfer"],["pod","Pay on Delivery (Lagos/Abuja/PH only)"]].map(([val, label]) => (
                    <label key={val} className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors ${payment === val ? "border-[#1A1A1A] bg-[#F9F6F2]" : "border-neutral-200 hover:border-neutral-300"}`}>
                      <input type="radio" name="payment" value={val} checked={payment === val} onChange={() => setPayment(val)} className="accent-[#1A1A1A]" />
                      <span className="text-xs font-semibold text-[#1A1A1A]">{label}</span>
                    </label>
                  ))}
                </div>
                {payment === "card" && (
                  <div className="space-y-3 mt-4">
                    {[["Card Number","card-number","text"],["Expiry (MM/YY)","expiry","text"],["CVV","cvv","text"]].map(([label, id, type]) => (
                      <div key={id}>
                        <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">{label}</label>
                        <input required type={type} className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] bg-white" />
                      </div>
                    ))}
                  </div>
                )}
                <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors active:scale-95 mt-4">
                  Place Order — {formatMoney({ amount: total, currency: "NGN" })}
                </button>
              </>
            )}
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:pl-6">
          <h2 className="font-bold text-sm uppercase tracking-[0.12em] mb-5">Order Summary</h2>
          <div className="space-y-4 mb-5">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 text-sm">
                <div className="relative w-14 h-[70px] bg-[#F9F6F2] flex-shrink-0">
                  <span className="absolute -top-1.5 -right-1.5 bg-[#1A1A1A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center z-10">{item.quantity}</span>
                  <img src={item.image} alt={item.productName} className="w-full h-full object-cover object-center" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-2 text-[#1A1A1A]">{item.productName}</p>
                  <p className="text-[11px] text-neutral-400">{item.variantLabel}</p>
                  <p className="text-xs font-bold mt-1">{formatMoney({ amount: item.price.amount * item.quantity, currency: "NGN" })}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>{formatMoney(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>{shipping === 0 ? "Free" : formatMoney({ amount: shipping, currency: "NGN" })}</span></div>
            <div className="flex justify-between font-bold text-base border-t border-neutral-200 pt-3 mt-3">
              <span>Total</span><span>{formatMoney({ amount: total, currency: "NGN" })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
