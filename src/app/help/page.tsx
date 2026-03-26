const faqs = [
  {
    q: "How do I know if a gemstone is genuine?",
    a: "All listings should include certificate details and seller verification data before purchase.",
  },
  {
    q: "What happens when I win an auction?",
    a: "You receive checkout instructions and order confirmation in your account and email.",
  },
  {
    q: "Can I return a gemstone?",
    a: "Return policy depends on seller policy and platform terms shown during checkout.",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-zinc-900">Help Center</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Find support articles, FAQs, and contact channels.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Support Channels</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li>Email support: support@zamoragems.com</li>
            <li>Ticket response SLA: within 24 hours</li>
            <li>Phone support: 077 276 7060</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Knowledge Base</h2>
          <ul className="mt-3 space-y-3 text-sm text-zinc-700">
            {faqs.map((faq) => (
              <li key={faq.q}>
                <p className="font-semibold text-zinc-900">{faq.q}</p>
                <p className="text-zinc-600">{faq.a}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
