import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/mock/navigation";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/blog" className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-[#1A1A1A] transition-colors mb-8 inline-block">← The Fintava Edit</Link>
        <div className="flex gap-2 mb-4">
          {post.tags.map((t) => <span key={t} className="text-[9px] uppercase tracking-[0.14em] text-[#C4956A] font-bold">{t}</span>)}
        </div>
        <h1 className="font-black text-3xl sm:text-4xl text-[#1A1A1A] uppercase tracking-[0.02em] leading-tight mb-4">{post.title}</h1>
        <p className="text-xs text-neutral-400 mb-8">{post.author} · {post.date} · {post.readTime}</p>
        <div className="relative w-full mb-10 overflow-hidden bg-[#F9F6F2]" style={{ aspectRatio: "16/9" }}>
          <Image src={post.coverImage} alt={post.title} fill className="object-cover object-center" />
        </div>
        <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed">
          <p className="text-base font-medium mb-4">{post.excerpt}</p>
          <p>At Fintava, we believe a bag is more than an accessory — it is an expression of intention. Every piece in our collection is thoughtfully crafted to accompany you through life&apos;s most important moments. Whether you&apos;re stepping into the boardroom, attending a celebration, or simply living your best life, there is a Fintava bag built for exactly that moment.</p>
          <p className="mt-4">Premium leather care starts with understanding the material. Full-grain leather, our material of choice, develops a beautiful patina with age. The more you use it, the more character it gains — that is the promise of genuine leather craftsmanship.</p>
          <p className="mt-4">Our Nigerian-focused design philosophy ensures that every bag we create is appropriate for the heat, the hustle, and the glamour that defines life in Lagos, Abuja, and beyond.</p>
        </div>
        <div className="mt-12 border-t border-neutral-100 pt-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 mb-4">Continue Reading</p>
          <Link href="/blog" className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors">
            More Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
