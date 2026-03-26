import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getListingBySlug, getSellerById, listings } from "@/lib/marketplace-data";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const seller = getSellerById(listing.sellerId);
  const related = listings
    .filter((item) => item.category === listing.category && item.id !== listing.id)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <div className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <Image
          src={listing.image}
          alt={listing.title}
          width={900}
          height={700}
          className="h-full min-h-72 w-full rounded-2xl object-cover"
        />

        <section className="space-y-5">
          <p className="text-sm font-medium text-amber-700">{listing.category}</p>
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            {listing.title}
          </h1>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-zinc-100 p-3">
              <p className="text-zinc-500">Origin</p>
              <p className="font-medium text-zinc-900">{listing.origin}</p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-3">
              <p className="text-zinc-500">Treatment</p>
              <p className="font-medium text-zinc-900">{listing.treatment}</p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-3">
              <p className="text-zinc-500">Certificate</p>
              <p className="font-medium text-zinc-900">
                {listing.certificate ?? "Certificate available on request"}
              </p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-3">
              <p className="text-zinc-500">Auction Timer</p>
              <p className="font-medium text-zinc-900">
                {listing.auctionEndsInHours
                  ? `${listing.auctionEndsInHours} hours remaining`
                  : "Fixed price listing"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-zinc-600">Current Value</p>
            <p className="text-2xl font-bold text-zinc-900">
              {listing.currentBid ? `$${listing.currentBid}` : `$${listing.price}`}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Place Bid
              </button>
              <button
                type="button"
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900"
              >
                Buy Now
              </button>
            </div>
          </div>

          {seller ? (
            <div className="rounded-xl border border-zinc-200 p-4 text-sm">
              <p className="font-semibold text-zinc-900">{seller.name}</p>
              <p className="text-zinc-600">
                Rating {seller.rating} ({seller.reviews} reviews)
              </p>
              <Link
                href={`/sellers/${seller.slug}`}
                className="mt-2 inline-block font-medium text-amber-700"
              >
                Visit store
              </Link>
            </div>
          ) : null}
        </section>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Related products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.id} listing={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
