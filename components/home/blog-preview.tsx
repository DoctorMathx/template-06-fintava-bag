import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/mock/navigation";

export function BlogPreview() {
  return (
    <section className="py-16 lg:py-24 bg-[#F9F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4956A] font-bold mb-2">Guides & Lookbook</p>
            <h2 className="font-black text-2xl sm:text-3xl text-[#1A1A1A] uppercase tracking-[0.04em]">The Fintava Edit</h2>
          </div>
          <Link href="/blog" className="hidden sm:block text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-500 hover:text-[#1A1A1A] transition-colors">
            All Articles →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative overflow-hidden bg-neutral-200 mb-4" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[9px] uppercase tracking-[0.14em] text-[#C4956A] font-bold">{tag}</span>
                ))}
              </div>
              <h3 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#C4956A] transition-colors leading-snug mb-1">
                {post.title}
              </h3>
              <p className="text-[11px] text-neutral-400">{post.date} · {post.readTime}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
