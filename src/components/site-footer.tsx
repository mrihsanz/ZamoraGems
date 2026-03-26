import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-300">
            Zamora Gems & Jewellery
          </h3>
          <p className="mt-3 text-sm text-zinc-400">
            Main Street Kottambapitiya, Hettipola, Sri Lanka
          </p>
          <p className="mt-2 text-sm text-zinc-100">Contact number : 077 276 7060</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Marketplace
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-amber-300">
                Browse Gems
              </Link>
            </li>
            <li>
              <Link href="/auctions" className="hover:text-amber-300">
                Live Auctions
              </Link>
            </li>
            <li>
              <Link href="/sellers" className="hover:text-amber-300">
                Verified Sellers
              </Link>
            </li>
            <li>
              <Link href="/sell" className="hover:text-amber-300">
                Seller Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Support
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/help" className="hover:text-amber-300">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-amber-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-300">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Developer
          </h3>
          <p className="mt-3 text-sm text-zinc-400">Ihsan Mohamad (Sri Lanka)</p>
          <p className="mt-2 text-sm text-zinc-100">
            Contact Number : +94 77 123 3369
          </p>
        </div>
      </div>
    </footer>
  );
}
