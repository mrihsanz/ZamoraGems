const modules = [
  "Add Product",
  "Manage Listings",
  "Orders",
  "Analytics",
  "Payouts",
];

const uploadFields = [
  "Title",
  "Description",
  "Images",
  "Category",
  "SKU",
  "Weight",
  "Dimensions",
  "Origin",
  "Treatment",
  "Certification",
];

export default function SellPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-zinc-900">Seller Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Manage gemstone listings, orders, inventory, and sales insights from
          one place.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Dashboard Modules</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-700">
            {modules.map((module) => (
              <li key={module} className="rounded-lg bg-zinc-100 px-3 py-2">
                {module}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Product Upload Fields</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-700">
            {uploadFields.map((field) => (
              <li key={field} className="rounded-lg bg-zinc-100 px-3 py-2">
                {field}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
