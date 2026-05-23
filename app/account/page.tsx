import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F2]">
      <div className="max-w-lg mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="font-black text-2xl uppercase tracking-[0.04em] mb-2">My Account</h1>
          <p className="text-sm text-neutral-500">Sign in to manage your orders and wishlist</p>
        </div>
        <div className="bg-white p-8 shadow-sm space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Email</label>
            <input type="email" className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors" placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Password</label>
            <input type="password" className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors" placeholder="••••••••" />
          </div>
          <button className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#C4956A] transition-colors active:scale-95">Sign In</button>
          <div className="flex items-center gap-3 text-neutral-300"><div className="flex-1 h-px bg-neutral-100" /><span className="text-xs text-neutral-400">or</span><div className="flex-1 h-px bg-neutral-100" /></div>
          <button className="w-full border border-neutral-200 py-3.5 text-xs font-bold uppercase tracking-[0.14em] hover:border-[#1A1A1A] transition-colors">Create Account</button>
        </div>
        <div className="text-center mt-6">
          <Link href="/collections/womens" className="text-xs text-neutral-400 hover:text-[#1A1A1A] uppercase tracking-widest transition-colors">Continue as Guest →</Link>
        </div>
      </div>
    </div>
  );
}
