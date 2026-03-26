import Image from "next/image";
import Link from "next/link";
import { Listing, getSellerById } from "@/lib/marketplace-data";

type ProductCardProps = {
  listing: Listing;
  showAuctionMeta?: boolean;
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ listing, showAuctionMeta = true }: ProductCardProps) {
  const seller = getSellerById(listing.sellerId);
  const timer =
    typeof listing.auctionEndsInHours === "number"
      ? `${listing.auctionEndsInHours}h left`
      : undefined;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/products/${listing.slug}`} className="block">
        <Image
          src={listing.image}
          alt={listing.title}
          width={640}
          height={360}
          className="h-44 w-full object-cover"
        />
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${listing.slug}`}
            className="text-sm font-semibold text-zinc-900 hover:text-amber-700"
          >
            {listing.title}
          </Link>
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
            {listing.category}
          </span>
        </div>

        <div className="text-xs text-zinc-600">
          <p>
            Origin: {listing.origin} | Treatment: {listing.treatment}
          </p>
          {seller ? <p>Seller: {seller.name}</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {typeof listing.currentBid === "number" ? (
            <span className="font-semibold text-zinc-900">
              Current bid: {formatPrice(listing.currentBid)}
            </span>
          ) : (
            <span className="font-semibold text-zinc-900">
              Buy now: {formatPrice(listing.price)}
            </span>
          )}
          {showAuctionMeta && timer ? (
            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900">
              {timer}
            </span>
          ) : null}
          {listing.noReserve ? (
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
              No Reserve
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
