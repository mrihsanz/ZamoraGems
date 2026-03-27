import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories, listings } from "@/lib/marketplace-data";

export default function Home() {
  const featured = listings.slice(0, 3);
  const liveAuctions = listings.filter((item) => item.currentBid).slice(0, 4);
  const stats = [
    { label: "Verified Sellers", value: "150+" },
    { label: "Weekly Auctions", value: "400+" },
    { label: "Avg. Response Time", value: "< 2h" },
  ];

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-amber-200/40 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-900 px-6 py-14 text-white shadow-2xl sm:px-10">
        <div className="absolute -right-12 top-10 h-44 w-44 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute -left-12 bottom-10 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl" />
        <p className="inline-block rounded-full border border-amber-200/40 bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
          Trusted Gem Marketplace
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
          Discover Rare Gemstones and Bid Live with Zamora Gems
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-zinc-200 sm:text-base">
          Browse verified listings, place bids in real-time, and buy certified
          gemstones directly from trusted sellers.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg"
          >
            Shop Gemstones
          </Link>
          <Link
            href="/auctions"
            className="rounded-full border border-zinc-100/40 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur"
          >
            View Live Auctions
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-zinc-100/20 bg-white/5 p-3 backdrop-blur"
            >
              <p className="text-xl font-bold text-amber-300">{item.value}</p>
              <p className="text-xs text-zinc-200">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Browse Categories</h2>
          <Link href="/shop" className="text-sm font-medium text-amber-700">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href="/shop"
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-center text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-800 hover:shadow-md"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Listings</h2>
          <Link href="/shop" className="text-sm font-medium text-amber-700">
            See more
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Live Auctions</h2>
          <Link href="/auctions" className="text-sm font-medium text-amber-700">
            Ending soon
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {liveAuctions.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
