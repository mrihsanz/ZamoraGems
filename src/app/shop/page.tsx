import { ProductCard } from "@/components/product-card";
import { categories, listings } from "@/lib/marketplace-data";

const filters = {
  price: ["Under $500", "$500-$1,000", "$1,000-$2,000", "$2,000+"],
  origin: ["Sri Lanka", "Madagascar", "Tanzania", "Australia", "Mozambique"],
  treatment: ["Unheated", "Heated", "Minor Oil"],
};

export default function ShopPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Shop Gemstones</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Browse certified gems with advanced filters by type, price, origin,
          and treatment.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Categories
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2">
                  <input type="checkbox" className="size-4 accent-amber-600" />
                  {category}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Price Range
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              {filters.price.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="size-4 accent-amber-600" />
                  {item}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Origin
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              {filters.origin.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="size-4 accent-amber-600" />
                  {item}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Treatment
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              {filters.treatment.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="size-4 accent-amber-600" />
                  {item}
                </label>
              ))}
            </div>
          </section>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-600">{listings.length} listings found</p>
            <select className="rounded-lg border border-zinc-300 px-3 py-2 text-sm">
              <option>Sort: Ending soon</option>
              <option>Sort: Price low to high</option>
              <option>Sort: Price high to low</option>
              <option>Sort: Most popular</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <ProductCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
