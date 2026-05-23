import type { Money, ProductVariant } from "./types";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(money.amount);
}

export function formatMoneyAmount(amount: number): string {
  return formatMoney({ amount, currency: "NGN" });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function variantLabel(variant: ProductVariant): string {
  const parts: string[] = [];
  if (variant.color) parts.push(variant.color);
  if (variant.size) parts.push(variant.size);
  if (variant.material) parts.push(variant.material);
  return parts.join(" / ") || "Default";
}
