"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Are your bags made from genuine leather?", a: "Yes. Every Fintava bag is crafted from genuine leather — full-grain, pebble, or soft grained depending on the style. We never use bonded leather or PU material in our core collection." },
  { q: "How long does delivery take in Nigeria?", a: "Lagos and Abuja: 1–2 business days. Other states: 2–5 business days. Orders above ₦100,000 qualify for free delivery nationwide. You will receive tracking details via email once your order is dispatched." },
  { q: "Do you offer pay on delivery?", a: "Yes. Pay on delivery is available for orders in Lagos, Abuja, and Port Harcourt. Payment must be made in full upon delivery." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery, provided the bag is unused, in its original condition, and returned with all original packaging and dust bags. Contact our support team to initiate a return." },
  { q: "How do I care for my leather bag?", a: "We recommend wiping with a clean, dry cloth after each use. Apply a quality leather conditioner monthly, especially in dry weather. Store in the provided dust bag when not in use and avoid prolonged exposure to rain or direct sunlight." },
  { q: "Do you ship internationally?", a: "Currently, Fintava delivers within Nigeria only. International shipping will be available soon — sign up to our newsletter for updates." },
  { q: "How do I know what size to choose?", a: "Each product page lists precise dimensions (in cm) and strap length details. Please refer to our Size Guide page for a visual comparison across bag styles." },
  { q: "Can I customise a bag?", a: "We currently do not offer individual customisation. However, we do offer limited-edition collaborations and corporate gifting programmes. Contact us to learn more." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F9F6F2] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-black text-3xl uppercase tracking-[0.04em]">Frequently Asked Questions</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-neutral-100">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex items-center justify-between w-full py-5 text-sm font-bold text-left text-[#1A1A1A] uppercase tracking-[0.06em]">
              {faq.q}
              <ChevronDown className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="pb-5 text-sm text-neutral-500 leading-relaxed">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
