import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F2] flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-10 text-center shadow-sm">
        <CheckCircle className="w-12 h-12 text-[#C4956A] mx-auto mb-5" />
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-3">Order Confirmed</p>
        <h1 className="font-black text-2xl uppercase tracking-[0.04em] text-[#1A1A1A] mb-3">Thank You!</h1>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          Your order has been placed successfully. You will receive a confirmation email shortly. Expect delivery in 2–5 business days.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors active:scale-95">
            Continue Shopping
          </Link>
          <Link href="/account" className="block w-full border border-neutral-200 py-3 text-xs font-medium uppercase tracking-widest text-neutral-600 hover:border-[#1A1A1A] transition-colors">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
