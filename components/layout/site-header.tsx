"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { navItems } from "@/mock/navigation";
import type { NavItem } from "@/lib/types";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 text-[#1A1A1A] hover:text-[#C4956A] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <span className="font-display font-black text-2xl sm:text-3xl tracking-[0.02em] text-[#1A1A1A] hover:text-[#C4956A] transition-colors">
              Fintava
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                open={openDropdown === item.label}
                onOpen={(l) => setOpenDropdown(l)}
                onClose={() => setOpenDropdown(null)}
              />
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#1A1A1A] hover:text-[#C4956A] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/wishlist"
              className="relative p-2 text-[#1A1A1A] hover:text-[#C4956A] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1A1A1A] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 text-[#1A1A1A] hover:text-[#C4956A] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1A1A1A] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-neutral-100 bg-white px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bags, wallets, styles..."
              className="flex-1 border-b border-neutral-300 bg-transparent py-2 text-sm text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
            <button
              type="submit"
              className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#C4956A] transition-colors px-2"
            >
              Search
            </button>
            <button type="button" onClick={() => setSearchOpen(false)} className="text-neutral-400 hover:text-[#1A1A1A]">
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <Link href="/" className="font-display font-black text-xl tracking-[0.02em]" onClick={() => setMobileOpen(false)}>
                Fintava
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-5 py-4 space-y-1">
              {navItems.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
              ))}
            </nav>
            <div className="px-5 py-4 border-t border-neutral-100 space-y-3">
              <Link href="/account" className="block text-sm text-neutral-600 hover:text-[#1A1A1A]" onClick={() => setMobileOpen(false)}>My Account</Link>
              <Link href="/wishlist" className="block text-sm text-neutral-600 hover:text-[#1A1A1A]" onClick={() => setMobileOpen(false)}>Wishlist</Link>
              <Link href="/contact" className="block text-sm text-neutral-600 hover:text-[#1A1A1A]" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopNavItem({ item, open, onOpen, onClose }: { item: NavItem; open: boolean; onOpen: (l: string) => void; onClose: () => void }) {
  if (!item.children) {
    return (
      <Link
        href={item.href ?? "#"}
        className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors hover:text-[#C4956A] ${item.label === "Sale" ? "text-[#C4956A]" : "text-[#1A1A1A]"}`}
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div className="relative" onMouseEnter={() => onOpen(item.label)} onMouseLeave={onClose}>
      <button className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1A1A1A] hover:text-[#C4956A] transition-colors">
        {item.label}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 bg-white border border-neutral-100 shadow-lg min-w-[220px] z-50 py-2">
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href ?? "#"}
              className="block px-5 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-[#1A1A1A] transition-colors uppercase tracking-[0.08em] font-medium"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  if (!item.children) {
    return (
      <Link
        href={item.href ?? "#"}
        className={`block py-2.5 text-sm font-semibold uppercase tracking-[0.08em] ${item.label === "Sale" ? "text-[#C4956A]" : "text-[#1A1A1A]"}`}
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="pl-4 pb-2 space-y-0.5 border-l border-neutral-100 ml-1">
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href ?? "#"}
              className="block py-2 text-xs text-neutral-500 hover:text-[#1A1A1A] uppercase tracking-[0.06em]"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
