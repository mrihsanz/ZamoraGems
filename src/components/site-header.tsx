import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/auctions", label: "Auctions" },
  { href: "/sellers", label: "Sellers" },
  { href: "/sell", label: "Sell" },
  { href: "/admin", label: "Admin" },
  { href: "/help", label: "Help" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-amber-100/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/zamora-logo.png"
            alt="Zamora Gems and Jewellery"
            width={44}
            height={44}
            className="rounded-lg border border-amber-200 shadow-sm"
          />
          <div>
            <p className="text-sm font-semibold text-zinc-900">Zamora Gems</p>
            <p className="text-xs text-zinc-600">Marketplace & Auctions</p>
          </div>
        </Link>

        <div className="hidden flex-1 md:flex">
          <label className="sr-only" htmlFor="search-gems">
            Search gems
          </label>
          <input
            id="search-gems"
            type="search"
            placeholder="Search sapphire, ruby, emerald..."
            className="w-full rounded-full border border-zinc-300/80 bg-white px-4 py-2 text-sm outline-none ring-amber-500 transition focus:ring-2"
          />
        </div>

        <nav className="hidden items-center gap-4 text-sm text-zinc-700 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 transition hover:bg-amber-50 hover:text-amber-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 text-sm">
          <Link
            href="/account"
            className="rounded-full border border-zinc-300 px-3 py-1.5 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
          >
            Login
          </Link>
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1.5 font-medium text-black shadow-sm"
          >
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}
