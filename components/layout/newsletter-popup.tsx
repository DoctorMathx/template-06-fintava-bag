"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("fintava-newsletter-dismissed");
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 6000);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => { sessionStorage.setItem("fintava-newsletter-dismissed", "1"); setVisible(false); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    sessionStorage.setItem("fintava-newsletter-dismissed", "1");
    setTimeout(() => setVisible(false), 2500);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />
      <div className="relative bg-white max-w-md w-full shadow-2xl">
        <button onClick={dismiss} className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-[#1A1A1A] transition-colors" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <div className="p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-3">✦</p>
              <h3 className="font-black text-lg uppercase tracking-[0.08em] mb-2">Welcome to Fintava</h3>
              <p className="text-sm text-neutral-500">Your exclusive discount has been sent to your inbox.</p>
            </div>
          ) : (
            <>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4956A] font-bold mb-3">Exclusive Offer</p>
              <h3 className="font-black text-2xl sm:text-3xl uppercase tracking-[0.04em] text-[#1A1A1A] mb-2 leading-tight">
                10% Off Your<br />First Order
              </h3>
              <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                Join the Fintava community for early access to new arrivals, exclusive sales, and curated style edits.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border border-neutral-200 px-4 py-3 text-sm text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#C4956A] transition-colors active:scale-95"
                >
                  Claim 10% Off
                </button>
              </form>
              <button onClick={dismiss} className="mt-4 text-xs text-neutral-400 hover:text-neutral-600 text-center w-full transition-colors">
                No thanks, I&apos;ll pay full price
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
