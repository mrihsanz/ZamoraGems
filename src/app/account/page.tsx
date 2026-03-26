const accountSections = [
  {
    title: "Orders",
    description: "Track completed and in-progress purchases from all sellers.",
  },
  {
    title: "Wishlist",
    description: "Save favorite gems and receive updates when price changes.",
  },
  {
    title: "Bids",
    description: "Monitor all active bids and auction result history.",
  },
  {
    title: "Addresses & Payments",
    description: "Manage delivery details and secure checkout methods.",
  },
];

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-zinc-900">My Account</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Login or register to manage bids, orders, and saved gemstone
          collections.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {accountSections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-zinc-900">{section.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{section.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
