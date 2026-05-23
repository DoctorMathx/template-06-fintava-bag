export interface Money {
  amount: number;
  currency: "NGN";
}

export interface ProductVariant {
  id: string;
  size?: string;          // e.g. "Small", "Medium", "Large"
  color?: string;         // e.g. "Black", "Saddle", "Chalk"
  colorHex?: string;      // e.g. "#1A1A1A"
  material?: string;      // e.g. "Pebble Leather", "Signature Canvas"
  price: Money;
  compareAtPrice?: Money;
  available: boolean;
  sku?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  images: string[];
  variants: ProductVariant[];
  defaultVariantId: string;
  collections: string[];
  tags: string[];
  category?: string;       // "Shoulder Bag", "Tote", "Crossbody", etc.
  material?: string;
  dimensions?: string;
  strap?: string;          // "Shoulder", "Crossbody", "Top Handle", "Detachable"
  closure?: string;        // "Zip", "Snap", "Magnetic"
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  rating?: number;
  reviewCount?: number;
  careInstructions?: string[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  productIds: string[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  productName: string;
  variantLabel: string;
  price: Money;
  image: string;
  slug: string;
}

export interface WishlistItem {
  productId: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  content?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}
