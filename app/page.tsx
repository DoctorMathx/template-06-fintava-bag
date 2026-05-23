import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { EditorialBanner } from "@/components/home/editorial-banner";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { SaleStrip } from "@/components/home/sale-strip";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogPreview } from "@/components/home/blog-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <EditorialBanner />
      <NewArrivalsSection />
      <SaleStrip />
      <TestimonialsSection />
      <BlogPreview />
    </>
  );
}
