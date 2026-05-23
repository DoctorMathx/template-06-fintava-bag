"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const CATEGORIES = ["All", "Shoulder Bag", "Tote", "Crossbody", "Satchel", "Belt Bag", "Briefcase", "Backpack", "Messenger", "Bucket Bag", "Clutch", "Hobo", "Wallet"];

export function CollectionClient({ products, name }: { products: Product[]; name: string }) {
  const [sort, setSort] = useState("featured");
  const [category, setCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const sorted = useMemo(() => {
    let p = category === "All" ? [...products] : products.filter((x) => x.category === category);
    if (sort === "price-asc") p.sort((a, b) => a.variants[0].price.amount - b.variants[0].price.amount);
    if (sort === "price-desc") p.sort((a, b) => b.variants[0].price.amount - a.variants[0].price.amount);
    if (sort === "newest") p = p.filter((x) => x.isNew).concat(p.filter((x) => !x.isNew));
    return p;
  }, [products, sort, category]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-8 border-b border-neutral-100 pb-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#1A1A1A] hover:text-[#C4956A] transition-colors sm:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">{sorted.length} items</span>
        </div>

        {/* Category filter — desktop */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c === "All" || products.some((p) => p.category === c)).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all ${category === c ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "border-neutral-200 text-neutral-600 hover:border-[#1A1A1A]"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-neutral-200 text-xs text-[#1A1A1A] px-3 py-2 focus:outline-none focus:border-[#1A1A1A] uppercase tracking-widest font-semibold bg-white"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Mobile filter panel */}
      {filterOpen && (
        <div className="sm:hidden mb-6 p-4 border border-neutral-100 bg-[#F9F6F2]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-widest font-bold">Category</p>
            <button onClick={() => setFilterOpen(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c === "All" || products.some((p) => p.category === c)).map((c) => (
              <button
                key={c}
                onClick={() => { setCategory(c); setFilterOpen(false); }}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all ${category === c ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "border-neutral-200 text-neutral-600"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm text-neutral-400 uppercase tracking-widest">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
