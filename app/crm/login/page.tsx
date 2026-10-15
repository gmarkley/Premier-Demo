"use client";

import { FormEvent, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const res = await fetch("/api/crm/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Those credentials did not match.");
        return;
      }
      const next = search.get("next") || "/crm";
      router.replace(next.startsWith("/crm") ? next : "/crm");
      router.refresh();
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-gold-500/25 bg-gray-950/80 p-8 shadow-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
          Premier Entertainment
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-white">Contact CRM</h1>
        <p className="mt-2 text-sm text-gray-400">
          Team sign-in to view website inquiries.
        </p>
        <label className="mt-6 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-gold-500/50"
        />
        {error ? (
          <p className="mt-3 text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-gold-500 py-3 text-sm font-bold text-gray-950 hover:bg-gold-400 disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function CrmLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
