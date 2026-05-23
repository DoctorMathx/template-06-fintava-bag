import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/mock/navigation";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F9F6F2] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Guides & Lookbook</p>
          <h1 className="font-black text-3xl sm:text-4xl uppercase tracking-[0.04em]">The Fintava Edit</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative overflow-hidden bg-[#F9F6F2] mb-4" style={{ aspectRatio: "16/10" }}>
                <Image src={post.coverImage} alt={post.title} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex gap-2 mb-2">
                {post.tags.map((t) => <span key={t} className="text-[9px] uppercase tracking-[0.14em] text-[#C4956A] font-bold">{t}</span>)}
              </div>
              <h2 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#C4956A] transition-colors leading-snug mb-1">{post.title}</h2>
              <p className="text-xs text-neutral-400 mb-2">{post.date} · {post.readTime}</p>
              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
