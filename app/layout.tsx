import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { ToastProvider } from "@/lib/toast-context";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { ToastContainer } from "@/components/layout/toast-container";
import { NewsletterPopup } from "@/components/layout/newsletter-popup";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fintava.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Fintava — Premium Leather Bags Nigeria", template: "%s | Fintava" },
  description: "Curated luxury leather bags for Nigeria's modern woman and man. Shop premium handbags, totes, crossbody bags, wallets and briefcases. Free delivery above ₦100,000.",
  keywords: ["luxury bags Nigeria", "leather handbags Lagos", "designer bags Nigeria", "premium tote bags", "leather briefcase Nigeria"],
  openGraph: {
    type: "website",
    siteName: "Fintava Nigeria",
    title: "Fintava — Premium Leather Bags Nigeria",
    description: "Curated luxury leather bags for Nigeria's modern woman and man. Shop premium handbags, totes, crossbody bags, and briefcases.",
    url: siteUrl,
    locale: "en_NG",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fintava — Premium Leather Bags Nigeria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintava — Premium Leather Bags Nigeria",
    description: "Curated luxury leather bags for Nigeria's modern woman and man.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
              <CartDrawer />
              <ToastContainer />
              <NewsletterPopup />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
