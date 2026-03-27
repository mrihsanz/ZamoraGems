"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, listings, Listing } from "@/lib/marketplace-data";
import { ADMIN_EVENT, readAdminItems } from "@/lib/admin-shop";

const filterOptions = {
  price: ["Under $500", "$500-$1,000", "$1,000-$2,000", "$2,000+"],
  origin: ["Sri Lanka", "Madagascar", "Tanzania", "Australia", "Mozambique"],
  treatment: ["Unheated", "Heated", "Minor Oil"],
};

type SortOption =
  | "ending-soon"
  | "price-low-high"
  | "price-high-low"
  | "most-popular";

function effectivePrice(item: Listing) {
  return item.currentBid ?? item.price;
}

function inPriceRange(amount: number, range: string) {
  if (range === "Under $500") return amount < 500;
  if (range === "$500-$1,000") return amount >= 500 && amount <= 1000;
  if (range === "$1,000-$2,000") return amount > 1000 && amount <= 2000;
  if (range === "$2,000+") return amount > 2000;
  return true;
}

export default function ShopPage() {
  const [allListings, setAllListings] = useState<Listing[]>(listings);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("ending-soon");

  useEffect(() => {
    const load = () => {
      const adminItems = readAdminItems();
      setAllListings([...adminItems, ...listings]);
    };
    load();
    window.addEventListener(ADMIN_EVENT, load);
    return () => window.removeEventListener(ADMIN_EVENT, load);
  }, []);

  const filteredListings = useMemo(() => {
    const filtered = allListings.filter((item) => {
      const itemPrice = effectivePrice(item);

      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const originMatch =
        selectedOrigins.length === 0 || selectedOrigins.includes(item.origin);
      const treatmentMatch =
        selectedTreatments.length === 0 ||
        selectedTreatments.includes(item.treatment);
      const priceMatch =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => inPriceRange(itemPrice, range));

      return categoryMatch && originMatch && treatmentMatch && priceMatch;
    });

    const sorted = [...filtered];
    if (sortBy === "ending-soon") {
      sorted.sort(
        (a, b) => (a.auctionEndsInHours ?? Number.MAX_SAFE_INTEGER) - (b.auctionEndsInHours ?? Number.MAX_SAFE_INTEGER),
      );
    } else if (sortBy === "price-low-high") {
      sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    } else if (sortBy === "price-high-low") {
      sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    } else if (sortBy === "most-popular") {
      sorted.sort((a, b) => Number(Boolean(b.currentBid)) - Number(Boolean(a.currentBid)));
    }

    return sorted;
  }, [
    selectedCategories,
    selectedPriceRanges,
    selectedOrigins,
    selectedTreatments,
    sortBy,
    allListings,
  ]);

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set([...categories, ...allListings.map((item) => item.category)])),
    [allListings],
  );
  const originOptions = useMemo(
    () => Array.from(new Set([...filterOptions.origin, ...allListings.map((item) => item.origin)])),
    [allListings],
  );
  const treatmentOptions = useMemo(
    () =>
      Array.from(
        new Set([...filterOptions.treatment, ...allListings.map((item) => item.treatment)]),
      ),
    [allListings],
  );

  function toggleItem(
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void,
  ) {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
      return;
    }
    setSelected([...selected, value]);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">Shop Gemstones</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Browse certified gems with advanced filters by type, price, origin,
          and treatment.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6 rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Categories
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              {categoryOptions.map((category) => (
                <label key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 accent-amber-600"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      toggleItem(category, selectedCategories, setSelectedCategories)
                    }
                  />
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
              {filterOptions.price.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 accent-amber-600"
                    checked={selectedPriceRanges.includes(item)}
                    onChange={() =>
                      toggleItem(item, selectedPriceRanges, setSelectedPriceRanges)
                    }
                  />
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
              {originOptions.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 accent-amber-600"
                    checked={selectedOrigins.includes(item)}
                    onChange={() => toggleItem(item, selectedOrigins, setSelectedOrigins)}
                  />
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
              {treatmentOptions.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 accent-amber-600"
                    checked={selectedTreatments.includes(item)}
                    onChange={() =>
                      toggleItem(item, selectedTreatments, setSelectedTreatments)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          </section>
          <button
            type="button"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-amber-500 hover:text-amber-700"
            onClick={() => {
              setSelectedCategories([]);
              setSelectedPriceRanges([]);
              setSelectedOrigins([]);
              setSelectedTreatments([]);
              setSortBy("ending-soon");
            }}
          >
            Clear all filters
          </button>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between rounded-3xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm">
            <p className="text-sm text-zinc-600">{filteredListings.length} listings found</p>
            <select
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
            >
              <option value="ending-soon">Sort: Ending soon</option>
              <option value="price-low-high">Sort: Price low to high</option>
              <option value="price-high-low">Sort: Price high to low</option>
              <option value="most-popular">Sort: Most popular</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredListings.map((listing) => (
              <ProductCard key={listing.id} listing={listing} />
            ))}
          </div>
          {filteredListings.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-600">
              No listings match the selected filters.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
