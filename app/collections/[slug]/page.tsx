import { notFound } from "next/navigation";
import Image from "next/image";
import { getCollectionBySlug, collections } from "@/mock/collections";
import { getProductsByCollection } from "@/mock/products";
import { CollectionClient } from "./collection-client";

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  const products = getProductsByCollection(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[#1A1A1A] overflow-hidden" style={{ minHeight: "260px" }}>
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Collection</p>
          <h1 className="font-black text-3xl sm:text-4xl text-white uppercase tracking-[0.04em]">{collection.name}</h1>
          <p className="text-white/60 text-sm mt-3 max-w-md mx-auto">{collection.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <CollectionClient products={products} name={collection.name} />
      </div>
    </div>
  );
}
