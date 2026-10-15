"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  notes: string;
  createdAt: string;
};

const STATUSES = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "booked", label: "Booked" },
  { id: "closed", label: "Closed" },
];

function badgeClass(status: string) {
  if (status === "booked") return "bg-emerald-500/20 text-emerald-200";
  if (status === "contacted") return "bg-sky-500/20 text-sky-200";
  if (status === "closed") return "bg-gray-500/30 text-gray-300";
  return "bg-gold-500/20 text-gold-200";
}

export default function CrmPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/crm/contacts");
    if (res.status === 401) {
      router.replace("/crm/login");
      return;
    }
    const data = (await res.json()) as { contacts?: Contact[]; error?: string };
    if (!res.ok) {
      setError(data.error || "Could not load contacts.");
      return;
    }
    setContacts(data.contacts || []);
  }

  useEffect(() => {
    load().catch(() => setError("Could not load contacts."));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q),
    );
  }, [contacts, query]);

  const selected = contacts.find((c) => c.id === selectedId) || filtered[0] || null;

  async function save(patch: { status?: string; notes?: string }) {
    if (!selected) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/crm/contacts/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = (await res.json()) as { contact?: Contact; error?: string };
      if (!res.ok || !data.contact) {
        setError(data.error || "Could not save.");
        return;
      }
      setContacts((rows) =>
        rows.map((row) => (row.id === data.contact!.id ? data.contact! : row)),
      );
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/crm/logout", { method: "POST" });
    router.replace("/crm/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
            Premier Entertainment
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-white">Contact CRM</h1>
          <p className="mt-1 text-sm text-gray-400">
            Website inquiries. New leads also email vip@premierentertainment.events.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 hover:border-gold-500/50"
        >
          Sign out
        </button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search name, email, phone, or message"
        className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-gold-500/50"
      />

      {error ? (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-white/10 p-6 text-sm text-gray-400">
              No inquiries yet.
            </p>
          ) : (
            filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left ${
                  selected?.id === c.id
                    ? "border-gold-500/50 bg-gold-500/10"
                    : "border-white/10 bg-gray-950/60 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-white">{c.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${badgeClass(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-400">{c.email}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </button>
            ))
          )}
        </div>

        {selected ? (
          <article className="rounded-2xl border border-gold-500/20 bg-gray-950/80 p-6">
            <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
            <p className="mt-2 text-sm text-gray-300">
              <a className="text-gold-300 hover:underline" href={`mailto:${selected.email}`}>
                {selected.email}
              </a>
              {selected.phone ? (
                <>
                  {" · "}
                  <a className="text-gold-300 hover:underline" href={`tel:${selected.phone}`}>
                    {selected.phone}
                  </a>
                </>
              ) : null}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-200">
              {selected.message}
            </p>
            <label className="mt-6 block text-xs uppercase tracking-[0.12em] text-gray-500">
              Status
            </label>
            <select
              value={selected.status}
              disabled={saving}
              onChange={(e) => save({ status: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-gray-900 px-3 py-2 text-white"
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <label className="mt-4 block text-xs uppercase tracking-[0.12em] text-gray-500">
              Internal notes
            </label>
            <textarea
              defaultValue={selected.notes}
              key={selected.id}
              rows={5}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              onBlur={(e) => {
                if (e.target.value !== selected.notes) save({ notes: e.target.value });
              }}
            />
            <p className="mt-2 text-xs text-gray-500">Notes save when you leave the field.</p>
          </article>
        ) : null}
      </div>
    </div>
  );
}
