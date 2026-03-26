export type Listing = {
  id: string;
  slug: string;
  title: string;
  category: string;
  origin: string;
  treatment: string;
  price: number;
  currentBid?: number;
  auctionEndsInHours?: number;
  noReserve?: boolean;
  image: string;
  sellerId: string;
  certificate?: string;
};

export type Seller = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  bio: string;
};

export const categories = [
  "Sapphire",
  "Ruby",
  "Emerald",
  "Spinel",
  "Tourmaline",
  "Garnet",
  "Opal",
  "Aquamarine",
];

export const sellers: Seller[] = [
  {
    id: "s1",
    slug: "zamora-premium-store",
    name: "Zamora Premium Store",
    rating: 4.9,
    reviews: 281,
    location: "Hettipola, Sri Lanka",
    verified: true,
    bio: "Certified gemstone specialists with curated natural stones from Sri Lanka and East Africa.",
  },
  {
    id: "s2",
    slug: "ceylon-royal-gems",
    name: "Ceylon Royal Gems",
    rating: 4.8,
    reviews: 193,
    location: "Colombo, Sri Lanka",
    verified: true,
    bio: "Focused on unheated sapphire and ruby listings with global shipping support.",
  },
  {
    id: "s3",
    slug: "artisan-jewel-cut",
    name: "Artisan Jewel Cut",
    rating: 4.6,
    reviews: 114,
    location: "Ratnapura, Sri Lanka",
    verified: true,
    bio: "Small-batch cutters offering calibrated pairs and custom faceting services.",
  },
];

export const listings: Listing[] = [
  {
    id: "p1",
    slug: "royal-blue-sapphire-2-3ct",
    title: "2.30ct Royal Blue Sapphire - Oval Cut",
    category: "Sapphire",
    origin: "Sri Lanka",
    treatment: "Heated",
    price: 1350,
    currentBid: 980,
    auctionEndsInHours: 6,
    image: "/zamora-logo.png",
    sellerId: "s1",
    certificate: "AIG",
  },
  {
    id: "p2",
    slug: "natural-ruby-1-8ct",
    title: "1.80ct Natural Ruby - Cushion Cut",
    category: "Ruby",
    origin: "Mozambique",
    treatment: "Unheated",
    price: 1750,
    currentBid: 1225,
    auctionEndsInHours: 2,
    noReserve: true,
    image: "/zamora-logo.png",
    sellerId: "s2",
    certificate: "IGI",
  },
  {
    id: "p3",
    slug: "vivid-green-emerald-2-1ct",
    title: "2.10ct Vivid Green Emerald - Octagon Cut",
    category: "Emerald",
    origin: "Zambia",
    treatment: "Minor Oil",
    price: 1490,
    image: "/zamora-logo.png",
    sellerId: "s1",
    certificate: "GIA",
  },
  {
    id: "p4",
    slug: "pink-spinel-2ct",
    title: "2.00ct Mahenge Pink Spinel - Precision Cut",
    category: "Spinel",
    origin: "Tanzania",
    treatment: "Unheated",
    price: 1180,
    currentBid: 890,
    auctionEndsInHours: 11,
    image: "/zamora-logo.png",
    sellerId: "s3",
  },
  {
    id: "p5",
    slug: "teal-sapphire-3-1ct",
    title: "3.10ct Teal Sapphire - Cushion Cut",
    category: "Sapphire",
    origin: "Australia",
    treatment: "Unheated",
    price: 2100,
    image: "/zamora-logo.png",
    sellerId: "s2",
  },
  {
    id: "p6",
    slug: "chrome-tourmaline-2-6ct",
    title: "2.60ct Chrome Tourmaline - Oval",
    category: "Tourmaline",
    origin: "Kenya",
    treatment: "Unheated",
    price: 940,
    currentBid: 540,
    auctionEndsInHours: 4,
    noReserve: true,
    image: "/zamora-logo.png",
    sellerId: "s3",
  },
];

export function getSellerById(sellerId: string) {
  return sellers.find((seller) => seller.id === sellerId);
}

export function getSellerBySlug(slug: string) {
  return sellers.find((seller) => seller.slug === slug);
}

export function getListingBySlug(slug: string) {
  return listings.find((listing) => listing.slug === slug);
}

export function getListingsBySellerId(sellerId: string) {
  return listings.filter((listing) => listing.sellerId === sellerId);
}
