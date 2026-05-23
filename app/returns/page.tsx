export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F9F6F2] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-black text-3xl uppercase tracking-[0.04em]">Returns & Exchanges</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 space-y-8 text-sm">
        <p className="text-neutral-500 leading-relaxed">We want you to love your Fintava purchase. If for any reason you are not completely satisfied, we offer a straightforward returns process.</p>
        {[
          { title: "14-Day Return Window", body: "Returns are accepted within 14 days of confirmed delivery. Items must be unused, in original condition, and returned with all original packaging, dust bag, and tags intact." },
          { title: "How to Initiate a Return", body: "Contact us via our Contact page or on WhatsApp. Our team will provide a return authorisation and arrange a collection from your address (Lagos and Abuja only) or guide you on how to ship the item back." },
          { title: "Refunds", body: "Once we receive and inspect the returned item, a full refund will be processed within 5–7 business days to your original payment method." },
          { title: "Exchanges", body: "We offer exchanges for the same item in a different colour or size, subject to availability. Contact us within 14 days of delivery to request an exchange." },
          { title: "Non-Returnable Items", body: "Customised or personalised items, items that have been used, and items returned without original packaging are not eligible for return." },
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
