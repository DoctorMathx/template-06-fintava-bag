"use client";
import Link from "next/link";
import { footerLinks } from "@/mock/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🛡️", title: "Authentic Leather", sub: "100% genuine materials" },
            { icon: "🚚", title: "Free Delivery", sub: "Orders above ₦100,000" },
            { icon: "↩️", title: "Easy Returns", sub: "14-day return policy" },
            { icon: "💬", title: "Premium Support", sub: "Mon–Sat, 9am–6pm" },
          ].map((t) => (
            <div key={t.title} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{t.icon}</span>
              <p className="text-xs font-semibold uppercase tracking-widest">{t.title}</p>
              <p className="text-[11px] text-white/50">{t.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="font-display font-black text-3xl tracking-[0.02em] hover:text-[#C4956A] transition-colors block mb-4">
            Fintava
          </Link>
          <p className="text-[13px] text-white/60 leading-relaxed mb-6">
            Curated luxury leather goods for Nigeria&apos;s discerning woman and man. Crafted to last. Designed to impress.
          </p>
          {/* Social */}
          <div className="flex gap-3">
            {["IG", "TK", "FB", "X"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white/60 hover:border-white hover:text-white transition-all"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4">Help</h4>
          <ul className="space-y-2.5">
            {footerLinks.help.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4">Company</h4>
          <ul className="space-y-2.5">
            {footerLinks.company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4">Stay Connected</h4>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            New arrivals, exclusive offers, and style inspiration — delivered to your inbox.
          </p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-[#1A1A1A] py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#C4956A] hover:text-white transition-colors active:scale-95"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-6">
            <p className="text-[11px] text-white/40 uppercase tracking-widest mb-3">Secure Payments</p>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="border border-[#C4956A]/60 bg-[#C4956A]/10 text-[10px] text-[#C4956A] px-3 py-1.5 font-bold uppercase tracking-widest">
                FintavaPay
              </span>
              <span className="text-[9px] text-white/30 uppercase tracking-wider">Secured & Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <p>© 2026 Fintava. All rights reserved. A Finstore Template.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
