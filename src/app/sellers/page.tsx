import Link from "next/link";
import { sellers } from "@/lib/marketplace-data";

export default function SellersPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-zinc-900">Verified Sellers</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Discover trusted stores with transparent ratings and gemstone
          specialization.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sellers.map((seller) => (
          <article
            key={seller.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">{seller.name}</h2>
              {seller.verified ? (
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                  Verified
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-zinc-600">{seller.location}</p>
            <p className="mt-2 text-sm text-zinc-700">{seller.bio}</p>
            <p className="mt-3 text-sm font-medium text-zinc-900">
              Rating {seller.rating} ({seller.reviews} reviews)
            </p>
            <Link
              href={`/sellers/${seller.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-amber-700"
            >
              View profile
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
