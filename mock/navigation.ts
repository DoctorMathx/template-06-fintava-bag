import type { NavItem, BlogPost } from "@/lib/types";

export const announcements = [
  "Complimentary shipping on orders above ₦100,000 — Nigeria-wide",
  "New Arrivals: The Fintava City Shoulder Bag is here",
  "Sale: Up to 40% off selected styles — Limited time only",
];

export const navItems: NavItem[] = [
  {
    label: "Women",
    children: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "All Women's Bags", href: "/collections/womens" },
      { label: "Shoulder Bags", href: "/collections/shoulder-bags" },
      { label: "Tote Bags", href: "/collections/totes" },
      { label: "Crossbody Bags", href: "/collections/crossbody-bags" },
      { label: "Mini Bags", href: "/collections/mini-bags" },
      { label: "Satchels", href: "/collections/satchels" },
      { label: "Wallets & Accessories", href: "/collections/wallets-accessories" },
    ],
  },
  {
    label: "Men",
    children: [
      { label: "All Men's Bags", href: "/collections/mens" },
      { label: "Briefcases", href: "/collections/briefcases" },
      { label: "Backpacks", href: "/collections/backpacks" },
      { label: "Wallets", href: "/collections/wallets-accessories" },
    ],
  },
  {
    label: "Shop By",
    children: [
      { label: "Bestsellers", href: "/collections/bestsellers" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Mini Bags", href: "/collections/mini-bags" },
      { label: "Travel Bags", href: "/collections/backpacks" },
    ],
  },
  { label: "Sale", href: "/collections/sale" },
];

export const categoryTiles = [
  { label: "Shoulder Bags", href: "/collections/shoulder-bags", image: "/images/pexels-photo-9327162.jpg" },
  { label: "Tote Bags",     href: "/collections/totes",         image: "/images/collection-of-handbags-standing-in-a-row.jpg" },
  { label: "Crossbody",     href: "/collections/crossbody-bags",image: "/images/pexels-photo-8801036.jpg" },
  { label: "Mini Bags",     href: "/collections/mini-bags",     image: "/images/pexels-photo-8335273.jpg" },
  { label: "Men's",         href: "/collections/mens",          image: "/images/pexels-photo-6650001.jpg" },
  { label: "Wallets",       href: "/collections/wallets-accessories", image: "/images/pexels-photo-8743973.jpg" },
];

export const footerLinks = {
  help: [
    { label: "FAQs", href: "/faq" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Fintava", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Blog & Lookbook", href: "/blog" },
  ],
  account: [
    { label: "My Account", href: "/account" },
    { label: "Track My Order", href: "/account" },
    { label: "Wishlist", href: "/wishlist" },
  ],
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-style-a-leather-tote",
    title: "How to Style a Leather Tote Bag",
    excerpt: "From the boardroom to the weekend market — the leather tote is the most versatile bag you will ever own.",
    coverImage: "/images/PLP_WOMENS_NA_FOOTER_2.jpg",
    author: "Fintava Editorial",
    date: "May 15, 2026",
    readTime: "4 min read",
    tags: ["Style", "Tote Bags"],
  },
  {
    slug: "leather-care-guide",
    title: "The Complete Leather Care Guide",
    excerpt: "A well-cared-for leather bag is a lifetime investment. Here is everything you need to know to keep yours flawless.",
    coverImage: "/images/SU23_JULY_ELVSTILL_VERT_1.jpg",
    author: "Fintava Editorial",
    date: "May 8, 2026",
    readTime: "6 min read",
    tags: ["Care", "Leather"],
  },
  {
    slug: "bags-for-nigerian-professional-women",
    title: "The Best Bags for Nigerian Professional Women",
    excerpt: "From high-powered Lagos boardrooms to stylish Abuja networking events — bags that keep up with your ambition.",
    coverImage: "/images/PLP_HANDBAGS_HEADER_1.jpg",
    author: "Fintava Editorial",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    tags: ["Style", "Professional", "Nigeria"],
  },
];
