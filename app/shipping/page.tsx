export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F9F6F2] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-black text-3xl uppercase tracking-[0.04em]">Shipping & Delivery</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-sm">
        {[
          { title: "Free Delivery", body: "All orders above ₦100,000 qualify for complimentary delivery nationwide. No code needed — discount is applied automatically at checkout." },
          { title: "Standard Delivery", body: "Lagos & Abuja: 1–2 business days (₦3,000–₦5,000). Other states: 2–5 business days (₦5,000–₦8,000 depending on location)." },
          { title: "Pay on Delivery", body: "Available in Lagos, Abuja, and Port Harcourt for orders up to ₦200,000. Our delivery agent will contact you before arrival." },
          { title: "Order Tracking", body: "Once your order is dispatched, you will receive an SMS and email with your tracking number. Use this to monitor delivery progress in real time." },
          { title: "Packaging", body: "Every Fintava order is carefully packaged in our signature box with a branded dust bag. Ideal for gifting or for protecting your new investment." },
          { title: "Delays & Issues", body: "In the rare event of a delay, our customer support team is available Monday to Saturday, 9am–6pm (WAT) on WhatsApp: 0800-FINTAVA or via our Contact page." },
        ].map((s) => (
          <div key={s.title}>
            <h2 className="font-black text-base uppercase tracking-[0.08em] mb-2 text-[#1A1A1A]">{s.title}</h2>
            <p className="text-neutral-500 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
