"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { useAuth } from "@/hooks/useAuth";
import { markOnboardingPending } from "@/services/onboardingStorage";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await register({
        email,
        username,
        password,
        displayName: displayName || undefined,
      });
      markOnboardingPending();
      router.replace("/onboarding/bienvenue");
    } catch {
      setError("Inscription impossible. Vérifiez vos informations ou utilisez un autre email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <MotionFadeIn className="w-full max-w-lg">
        <Card elevated className="space-y-8 p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">NutriFlow</p>
            <h1 className="mt-2 font-manrope text-5xl font-semibold text-[var(--color-on-surface)]">Inscription</h1>
            <p className="mt-2 text-sm text-[var(--color-on-surface-soft)]">
              Créez votre sanctuaire culinaire et démarrez votre parcours santé.
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">
                Nom affiché
              </span>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none"
                placeholder="Elena Rose"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">
                Nom d&apos;utilisateur
              </span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none"
                placeholder="elena_rose"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none"
                placeholder="elena.rose@studio.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">
                Mot de passe
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={8}
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none"
              />
            </label>

            {error ? (
              <p className="rounded-2xl bg-[rgba(159,64,61,0.12)] px-4 py-3 text-sm text-[var(--color-error)]">{error}</p>
            ) : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer mon compte"}
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--color-on-surface-soft)]">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-semibold text-[var(--color-primary)]">
              Se connecter
            </Link>
          </p>
        </Card>
      </MotionFadeIn>
    </div>
  );
}
