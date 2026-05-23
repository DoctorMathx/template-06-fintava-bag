export default function SizeGuidePage() {
  const sizes = [
    { name: "Mini / Clutch", dimensions: "Up to 22cm × 16cm", fits: "Phone, cards, keys, lipstick", example: "Mini Crossbody, Signature Clutch" },
    { name: "Small", dimensions: "22–28cm × 16–20cm", fits: "Phone, wallet, earbuds, small notebook", example: "City Shoulder Bag (S), Belt Bag" },
    { name: "Medium", dimensions: "28–34cm × 20–26cm", fits: "Tablet, wallet, cosmetics, sunglasses", example: "City Shoulder Bag (M), Soft Hobo" },
    { name: "Large / Tote", dimensions: "34–42cm × 26–32cm", fits: "13\" laptop, documents, full day essentials", example: "Market Tote, Structured Satchel" },
    { name: "Extra Large / Work", dimensions: "40cm+ × 28cm+", fits: "15\" laptop, files, gym clothes", example: "Briefcase, Weekend Backpack" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F9F6F2] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-black text-3xl uppercase tracking-[0.04em]">Bag Size Guide</h1>
          <p className="text-neutral-500 text-sm mt-3 max-w-md mx-auto">Find the right Fintava bag for your lifestyle. Every bag lists precise measurements on its product page.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[#1A1A1A]">
                {["Size", "Dimensions", "What Fits", "Example Styles"].map((h) => (
                  <th key={h} className="text-left py-3 pr-6 text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((s, i) => (
                <tr key={s.name} className={`border-b border-neutral-100 ${i % 2 === 0 ? "bg-white" : "bg-[#F9F6F2]"}`}>
                  <td className="py-4 pr-6 font-bold text-[#1A1A1A] text-xs uppercase tracking-widest">{s.name}</td>
                  <td className="py-4 pr-6 text-neutral-500">{s.dimensions}</td>
                  <td className="py-4 pr-6 text-neutral-500">{s.fits}</td>
                  <td className="py-4 pr-6 text-[#C4956A] font-medium text-xs">{s.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-400 mt-6">* All measurements are approximate. Each product page lists exact dimensions. Contact us if you need help choosing.</p>
      </div>
    </div>
  );
}
