"use client";

import { FormEvent, useState } from "react";
import {
  makeAdminListing,
  readAdminItems,
  setAdminAuthenticated,
  writeAdminItems,
} from "@/lib/admin-shop";
import { categories } from "@/lib/marketplace-data";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "zamora@123";

type ItemForm = {
  title: string;
  category: string;
  origin: string;
  treatment: string;
  price: string;
  image: string;
  certificate: string;
};

const defaultForm: ItemForm = {
  title: "",
  category: categories[0],
  origin: "Sri Lanka",
  treatment: "Unheated",
  price: "",
  image: "/gems/sapphire-blue.png",
  certificate: "",
};

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<ItemForm>(defaultForm);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setIsAuthed(true);
      setError("");
      return;
    }
    setError("Invalid admin credentials.");
  }

  function handleLogout() {
    setAdminAuthenticated(false);
    setIsAuthed(false);
    setSuccess("");
  }

  function handleAddItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(form.price);
    if (!form.title.trim() || Number.isNaN(price) || price <= 0) {
      setError("Enter a valid title and price.");
      return;
    }

    const listing = makeAdminListing({
      title: form.title.trim(),
      category: form.category.trim(),
      origin: form.origin.trim(),
      treatment: form.treatment.trim(),
      price,
      image: form.image.trim() || "/gems/sapphire-blue.png",
      certificate: form.certificate.trim() || undefined,
    });

    const current = readAdminItems();
    writeAdminItems([listing, ...current]);
    setForm(defaultForm);
    setError("");
    setSuccess("Item added successfully. It now appears in the Shop page.");
  }

  if (!isAuthed) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Login as admin to add more items to the shop.
        </p>
        <form className="mt-5 space-y-4" onSubmit={handleLogin}>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white"
          >
            Login as Admin
          </button>
          <p className="text-xs text-zinc-500">
            Demo credentials: <code>admin</code> / <code>zamora@123</code>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Add new gemstone items to the shop listing.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleAddItem}
        className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <label className="text-sm">
          <span className="mb-1 block font-medium text-zinc-700">Title</span>
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2"
            placeholder="e.g. 1.50ct Natural Spinel"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-zinc-700">Category</span>
          <input
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-zinc-700">Origin</span>
          <input
            value={form.origin}
            onChange={(event) => setForm({ ...form, origin: event.target.value })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-zinc-700">Treatment</span>
          <input
            value={form.treatment}
            onChange={(event) => setForm({ ...form, treatment: event.target.value })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-zinc-700">Price (USD)</span>
          <input
            type="number"
            min="1"
            value={form.price}
            onChange={(event) => setForm({ ...form, price: event.target.value })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-zinc-700">Certificate</span>
          <input
            value={form.certificate}
            onChange={(event) => setForm({ ...form, certificate: event.target.value })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2"
            placeholder="Optional"
          />
        </label>

        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-zinc-700">
            Image Path or URL
          </span>
          <input
            value={form.image}
            onChange={(event) => setForm({ ...form, image: event.target.value })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2"
            placeholder="/gems/sapphire-blue.png or https://..."
          />
        </label>

        {error ? <p className="text-sm text-red-600 sm:col-span-2">{error}</p> : null}
        {success ? (
          <p className="text-sm text-emerald-700 sm:col-span-2">{success}</p>
        ) : null}

        <button
          type="submit"
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white sm:col-span-2"
        >
          Add Item to Shop
        </button>
      </form>
    </div>
  );
}
