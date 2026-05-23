import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  { id: "c01", slug: "new-arrivals",       name: "New Arrivals",              description: "The latest additions to the Fintava world.",                      heroImage: "/images/PLP_HANDBAGS_HEADER_1.jpg",                       productIds: ["p01","p03","p05","p07","p09","p11"] },
  { id: "c02", slug: "womens",             name: "Women's Bags",              description: "Curated leather goods for the modern woman.",                     heroImage: "/images/PLP_WOMENS_NA_FOOTER_1.jpg",                      productIds: ["p01","p02","p03","p04","p05","p08","p09","p10","p11"] },
  { id: "c03", slug: "mens",               name: "Men's Bags",                description: "Refined leather essentials crafted for men.",                    heroImage: "/images/pexels-photo-6650001.jpg",                        productIds: ["p06","p07","p08","p12"] },
  { id: "c04", slug: "shoulder-bags",      name: "Shoulder Bags",             description: "From structured slings to relaxed hobos — all shoulder styles.", heroImage: "/images/pexels-photo-9327162.jpg",                        productIds: ["p01","p04","p09","p11"] },
  { id: "c05", slug: "totes",              name: "Tote Bags",                 description: "Spacious, sophisticated totes for every schedule.",               heroImage: "/images/collection-of-handbags-standing-in-a-row.jpg",   productIds: ["p02"] },
  { id: "c06", slug: "crossbody-bags",     name: "Crossbody Bags",            description: "Hands-free luxury for life on the move.",                        heroImage: "/images/pexels-photo-8801036.jpg",                        productIds: ["p03","p05","p10"] },
  { id: "c07", slug: "mini-bags",          name: "Mini Bags",                 description: "Small silhouettes. Enormous personality.",                       heroImage: "/images/pexels-photo-8335273.jpg",                        productIds: ["p03","p10"] },
  { id: "c08", slug: "satchels",           name: "Satchels",                  description: "Structured and polished — for every moment of command.",         heroImage: "/images/pexels-photo-9327162 (3).jpg",                    productIds: ["p04"] },
  { id: "c09", slug: "backpacks",          name: "Backpacks",                 description: "Premium backpacks designed to go the distance.",                  heroImage: "/images/pexels-photo-6650004.jpg",                        productIds: ["p07"] },
  { id: "c10", slug: "briefcases",         name: "Briefcases & Messengers",   description: "Executive-grade leather for the professional.",                   heroImage: "/images/pexels-photo-6650001 (2).jpg",                    productIds: ["p06","p12"] },
  { id: "c11", slug: "wallets-accessories",name: "Wallets & Accessories",     description: "The essentials that complete every look.",                        heroImage: "/images/pexels-photo-8743973.jpg",                        productIds: ["p08"] },
  { id: "c12", slug: "bestsellers",        name: "Bestsellers",               description: "Our most-loved pieces — as chosen by you.",                       heroImage: "/images/SU23_JULY_ELVSTILL_VERT_1.jpg",                   productIds: ["p01","p02","p04","p06","p12"] },
  { id: "c13", slug: "sale",               name: "Sale",                      description: "Select pieces at exceptional prices. Limited time.",              heroImage: "/images/PLP_HANDBAGS_03_04.jpg",                          productIds: ["p05","p08","p10"] },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
