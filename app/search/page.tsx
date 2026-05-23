"use client";

"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/mock/products";
import { ProductCard } from "@/components/product/product-card";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(q);

  useEffect(() => { setQuery(q); }, [q]);

  const results = q
    ? products.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.category?.toLowerCase().includes(q.toLowerCase()) ||
        p.material?.toLowerCase().includes(q.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-xl mx-auto mb-10">
        <form action="/search" className="flex items-center border-b-2 border-[#1A1A1A] pb-2">
          <Search className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search bags, wallets, styles..."
            className="flex-1 text-sm text-[#1A1A1A] bg-transparent focus:outline-none"
          />
        </form>
      </div>

      {q && (
        <>
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">
            {results.length} results for &ldquo;{q}&rdquo;
          </p>
          {results.length === 0 ? (
            <p className="text-center text-neutral-400 py-16 text-sm">No products matched your search. Try a different term.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-black text-2xl sm:text-3xl uppercase tracking-[0.04em]">Search</h1>
        </div>
      </div>
      <Suspense fallback={<div className="text-center py-20 text-neutral-400 text-sm">Loading...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
