"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      const redirectTarget =
        typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("redirect") : null;
      router.replace(redirectTarget || "/dashboard");
    } catch {
      setError("Connexion impossible. Vérifiez vos identifiants.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <MotionFadeIn className="w-full max-w-md">
        <Card elevated className="space-y-8 p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">NutriFlow</p>
            <h1 className="mt-2 font-manrope text-5xl font-semibold text-[var(--color-on-surface)]">Connexion</h1>
            <p className="mt-2 text-sm text-[var(--color-on-surface-soft)]">Accédez à votre sanctuaire culinaire digital.</p>
          </div>
          <form className="space-y-5" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none ring-0 placeholder:text-[var(--color-on-surface-soft)]"
                placeholder="elena.rose@studio.com"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Mot de passe</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none ring-0"
              />
            </label>
            {error ? <p className="rounded-2xl bg-[rgba(159,64,61,0.12)] px-4 py-3 text-sm text-[var(--color-error)]">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          <p className="text-center text-sm text-[var(--color-on-surface-soft)]">
            Nouveau sur NutriFlow ?{" "}
            <Link href="/register" className="font-semibold text-[var(--color-primary)]">
              Créer un compte
            </Link>
          </p>
        </Card>
      </MotionFadeIn>
    </div>
  );
}
