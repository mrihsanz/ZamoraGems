import { Listing } from "@/lib/marketplace-data";

export const ADMIN_AUTH_KEY = "zamora-admin-auth";
export const ADMIN_ITEMS_KEY = "zamora-admin-items";
export const ADMIN_EVENT = "zamora-shop-items-updated";

export type AdminListing = Listing & {
  createdAt: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function makeAdminListing(input: {
  title: string;
  category: string;
  origin: string;
  treatment: string;
  price: number;
  image: string;
  certificate?: string;
}): AdminListing {
  const uniqueId = `admin-${Date.now()}`;
  return {
    id: uniqueId,
    slug: `${slugify(input.title)}-${Date.now().toString().slice(-5)}`,
    title: input.title,
    category: input.category,
    origin: input.origin,
    treatment: input.treatment,
    price: input.price,
    image: input.image,
    sellerId: "s1",
    certificate: input.certificate,
    createdAt: new Date().toISOString(),
  };
}

export function readAdminItems(): AdminListing[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ADMIN_ITEMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AdminListing[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function writeAdminItems(items: AdminListing[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_ITEMS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(ADMIN_EVENT));
}

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function setAdminAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_AUTH_KEY, value ? "true" : "false");
}
