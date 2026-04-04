"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SelectionChip } from "@/components/ui/SelectionChip";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { useAuth } from "@/hooks/useAuth";
import { clearOnboardingPending, isOnboardingPending } from "@/services/onboardingStorage";
import { updateProfile } from "@/services/user";
import type { ActivityLevel, CookingLevel, Gender, Goal } from "@/types/api";

type OnboardingData = {
  displayName: string;
  subtitle: string;
  gender: Gender;
  birthDate: string;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  cookingLevel: CookingLevel;
  diets: string[];
  intolerances: string[];
  kcalGoal: number;
  hydrationGoalMl: number;
};

const totalSteps = 5;

const defaultData: OnboardingData = {
  displayName: "",
  subtitle: "",
  gender: "AUTRE",
  birthDate: "2000-01-01",
  heightCm: 170,
  activityLevel: "SEDENTAIRE",
  goal: "MAINTIEN",
  cookingLevel: "INITIE",
  diets: [],
  intolerances: [],
  kcalGoal: 2100,
  hydrationGoalMl: 2500,
};

function toggleOption(values: string[], option: string): string[] {
  return values.includes(option) ? values.filter((value) => value !== option) : [...values, option];
}

export default function OnboardingBienvenuePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OnboardingData>(defaultData);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, router, user]);

  useEffect(() => {
    if (!user) return;
    setData((prev) => ({
      ...prev,
      displayName: prev.displayName || user.displayName || user.username,
      kcalGoal: user.kcalGoal ?? prev.kcalGoal,
      hydrationGoalMl: user.hydrationGoalMl ?? prev.hydrationGoalMl,
    }));
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isOnboardingPending()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const progress = useMemo(() => (step / totalSteps) * 100, [step]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const submit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await updateProfile({
        displayName: data.displayName,
        subtitle: data.subtitle,
        gender: data.gender,
        birthDate: data.birthDate,
        heightCm: data.heightCm,
        activityLevel: data.activityLevel,
        goal: data.goal,
        cookingLevel: data.cookingLevel,
        dietPreferences: JSON.stringify(data.diets),
        intolerances: JSON.stringify(data.intolerances),
        kcalGoal: data.kcalGoal,
        hydrationGoalMl: data.hydrationGoalMl,
      });
      clearOnboardingPending();
      router.replace("/dashboard");
    } catch {
      setError("Impossible de finaliser l'onboarding pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user) {
    return <div className="grid min-h-[50vh] place-items-center text-[var(--color-on-surface-soft)]">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <MotionFadeIn>
        <div className="mb-4 text-sm text-[var(--color-on-surface-soft)]">
          Étape {step} / {totalSteps}
        </div>
        <div className="h-2 rounded-full bg-[var(--color-surface-low)]">
          <div className="h-2 rounded-full bg-[var(--color-primary)] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </MotionFadeIn>

      {step === 1 ? (
        <MotionFadeIn key="step1">
          <Card elevated className="space-y-6">
            <h2 className="page-title">Votre identité</h2>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Nom affiché</span>
              <input
                value={data.displayName}
                onChange={(e) => setData((prev) => ({ ...prev, displayName: e.target.value }))}
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Sous-titre</span>
              <input
                value={data.subtitle}
                onChange={(e) => setData((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none"
                placeholder="Culinary Alchemist & Wellness Guide"
              />
            </label>
          </Card>
        </MotionFadeIn>
      ) : null}

      {step === 2 ? (
        <MotionFadeIn key="step2">
          <Card elevated className="space-y-6">
            <h2 className="page-title">Votre profil physique</h2>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Genre</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Homme", value: "HOMME" },
                  { label: "Femme", value: "FEMME" },
                  { label: "Autre", value: "AUTRE" },
                ].map((option) => (
                  <SelectionChip
                    key={option.value}
                    label={option.label}
                    selected={data.gender === option.value}
                    onClick={() => setData((prev) => ({ ...prev, gender: option.value as Gender }))}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Date de naissance</span>
                <input
                  type="date"
                  value={data.birthDate}
                  onChange={(e) => setData((prev) => ({ ...prev, birthDate: e.target.value }))}
                  className="w-full rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 outline-none"
                />
              </label>
              <div>
                <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">
                  Taille: {data.heightCm} cm
                </span>
                <input
                  type="range"
                  min={140}
                  max={210}
                  value={data.heightCm}
                  onChange={(e) => setData((prev) => ({ ...prev, heightCm: Number(e.target.value) }))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Niveau d&apos;activité</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Sédentaire", value: "SEDENTAIRE" },
                  { label: "Actif", value: "ACTIF" },
                  { label: "Très actif", value: "TRES_ACTIF" },
                ].map((option) => (
                  <SelectionChip
                    key={option.value}
                    label={option.label}
                    selected={data.activityLevel === option.value}
                    onClick={() => setData((prev) => ({ ...prev, activityLevel: option.value as ActivityLevel }))}
                  />
                ))}
              </div>
            </div>
          </Card>
        </MotionFadeIn>
      ) : null}

      {step === 3 ? (
        <MotionFadeIn key="step3">
          <Card elevated className="space-y-6">
            <h2 className="page-title">Votre objectif principal</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { value: "PERTE", title: "Perte de poids", text: "Réduire progressivement votre apport calorique." },
                { value: "GAIN", title: "Prise de masse", text: "Soutenir une progression en force et récupération." },
                { value: "MAINTIEN", title: "Maintien & Équilibre", text: "Conserver votre énergie et votre routine." },
              ].map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setData((prev) => ({ ...prev, goal: goal.value as Goal }))}
                  className={`rounded-3xl p-5 text-left transition-colors ${
                    data.goal === goal.value ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-low)]"
                  }`}
                >
                  <p className="font-manrope text-2xl font-semibold">{goal.title}</p>
                  <p className={`mt-2 text-sm ${data.goal === goal.value ? "text-white/80" : "text-[var(--color-on-surface-soft)]"}`}>
                    {goal.text}
                  </p>
                </button>
              ))}
            </div>
          </Card>
        </MotionFadeIn>
      ) : null}

      {step === 4 ? (
        <MotionFadeIn key="step4">
          <Card elevated className="space-y-6">
            <h2 className="page-title">Votre ADN culinaire</h2>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Niveau de cuisine</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Débutant", value: "DEBUTANT" },
                  { label: "Initié", value: "INITIE" },
                  { label: "Intermédiaire", value: "INTERMEDIAIRE" },
                  { label: "Avancé", value: "AVANCE" },
                ].map((level) => (
                  <SelectionChip
                    key={level.value}
                    label={level.label}
                    selected={data.cookingLevel === level.value}
                    onClick={() => setData((prev) => ({ ...prev, cookingLevel: level.value as CookingLevel }))}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Régimes alimentaires</p>
              <div className="flex flex-wrap gap-2">
                {["Végétarien", "Vegan", "Sans Gluten", "Paléo", "Méditerranéen", "Keto"].map((diet) => (
                  <SelectionChip
                    key={diet}
                    label={diet}
                    selected={data.diets.includes(diet)}
                    onClick={() => setData((prev) => ({ ...prev, diets: toggleOption(prev.diets, diet) }))}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Intolérances</p>
              <div className="flex flex-wrap gap-2">
                {["Lactose", "Gluten", "Arachides", "Crustacés", "Oeufs", "Soja"].map((intolerance) => (
                  <SelectionChip
                    key={intolerance}
                    label={intolerance}
                    selected={data.intolerances.includes(intolerance)}
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        intolerances: toggleOption(prev.intolerances, intolerance),
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </Card>
        </MotionFadeIn>
      ) : null}

      {step === 5 ? (
        <MotionFadeIn key="step5">
          <Card elevated className="space-y-6">
            <h2 className="page-title">Récapitulatif</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[var(--color-surface-low)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Identité</p>
                <p className="mt-2 font-semibold">{data.displayName}</p>
                <p className="text-sm text-[var(--color-on-surface-soft)]">{data.subtitle || "Sans sous-titre"}</p>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface-low)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Objectif</p>
                <p className="mt-2 font-semibold">{data.goal}</p>
                <p className="text-sm text-[var(--color-on-surface-soft)]">
                  {data.kcalGoal} kcal · {(data.hydrationGoalMl / 1000).toFixed(1)} L
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface-low)] p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">ADN Culinaire</p>
                <p className="mt-2 text-sm text-[var(--color-on-surface-soft)]">
                  Régimes: {data.diets.length ? data.diets.join(", ") : "Aucun"} · Intolérances:{" "}
                  {data.intolerances.length ? data.intolerances.join(", ") : "Aucune"}
                </p>
              </div>
            </div>
            {error ? <p className="rounded-2xl bg-[rgba(159,64,61,0.12)] px-4 py-3 text-sm text-[var(--color-error)]">{error}</p> : null}
          </Card>
        </MotionFadeIn>
      ) : null}

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={prevStep} disabled={step === 1 || isSubmitting}>
          Retour
        </Button>
        {step < totalSteps ? (
          <Button onClick={nextStep}>Continuer</Button>
        ) : (
          <Button onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? "Finalisation..." : "Commencer mon voyage"}
          </Button>
        )}
      </div>
    </div>
  );
}
