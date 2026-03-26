import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories, listings } from "@/lib/marketplace-data";

export default function Home() {
  const featured = listings.slice(0, 3);
  const liveAuctions = listings.filter((item) => item.currentBid).slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-amber-800 px-6 py-12 text-white sm:px-10">
        <p className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
          Trusted Gem Marketplace
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-bold sm:text-5xl">
          Discover Rare Gemstones and Bid Live with Zamora Gems
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-zinc-200 sm:text-base">
          Browse verified listings, place bids in real-time, and buy certified
          gemstones directly from trusted sellers.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black"
          >
            Shop Gemstones
          </Link>
          <Link
            href="/auctions"
            className="rounded-full border border-zinc-100/40 px-5 py-2.5 text-sm font-semibold"
          >
            View Live Auctions
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Browse Categories</h2>
          <Link href="/shop" className="text-sm font-medium text-amber-700">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href="/shop"
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-center text-sm font-semibold shadow-sm transition hover:border-amber-300 hover:text-amber-800"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Listings</h2>
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
          <h2 className="text-xl font-semibold">Live Auctions</h2>
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
