import { ProductCard } from "@/components/product-card";
import { listings } from "@/lib/marketplace-data";

export default function AuctionsPage() {
  const auctionItems = listings.filter((item) => typeof item.currentBid === "number");
  const endingSoon = [...auctionItems].sort(
    (a, b) => (a.auctionEndsInHours ?? 999) - (b.auctionEndsInHours ?? 999),
  );
  const noReserve = auctionItems.filter((item) => item.noReserve);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-zinc-900">Live Auctions</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Join active bids, track countdowns, and win unique gemstones before
          time runs out.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Ending Soon</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {endingSoon.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">No Reserve Auctions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {noReserve.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
