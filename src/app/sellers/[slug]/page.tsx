import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getListingsBySellerId, getSellerBySlug } from "@/lib/marketplace-data";

type SellerPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SellerProfilePage({ params }: SellerPageProps) {
  const { slug } = await params;
  const seller = getSellerBySlug(slug);

  if (!seller) {
    notFound();
  }

  const sellerListings = getListingsBySellerId(seller.id);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold text-zinc-900">{seller.name}</h1>
          {seller.verified ? (
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
              Verified Seller
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-zinc-600">{seller.location}</p>
        <p className="mt-4 max-w-3xl text-sm text-zinc-700">{seller.bio}</p>
        <p className="mt-4 text-sm font-medium text-zinc-900">
          Seller rating: {seller.rating} ({seller.reviews} reviews)
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Seller listings</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sellerListings.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
