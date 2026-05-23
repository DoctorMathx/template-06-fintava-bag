"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F9F6F2] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-black text-3xl uppercase tracking-[0.04em]">Contact Us</h1>
          <p className="text-neutral-500 text-sm mt-3">We&apos;re here Monday – Saturday, 9am – 6pm (WAT)</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          {[
            { icon: "📍", title: "Visit Us", body: "Lagos Showroom: 14 Adeola Odeku Street, Victoria Island, Lagos\nAbuja Showroom: Plot 1266, Muhammadu Buhari Way, Central Business District" },
            { icon: "📞", title: "Call or WhatsApp", body: "+234 800 FINTAVA\n+234 813 000 0000" },
            { icon: "✉️", title: "Email", body: "hello@fintava.ng\norders@fintava.ng" },
          ].map((c) => (
            <div key={c.title} className="flex gap-4">
              <span className="text-2xl mt-1">{c.icon}</span>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest mb-1">{c.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed whitespace-pre-line">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-4">✦</p>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-2">Message Received</h3>
              <p className="text-sm text-neutral-500">We will respond within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              {[["Full Name","text"],["Email","email"],["Phone (optional)","tel"]].map(([label, type]) => (
                <div key={label}>
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">{label}</label>
                  <input type={type} required={label !== "Phone (optional)"} className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Message</label>
                <textarea required rows={5} className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors active:scale-95">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
