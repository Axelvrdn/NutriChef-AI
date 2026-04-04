"use client";

import { useEffect, useState } from "react";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { Card } from "@/components/ui/Card";
import { SelectionChip } from "@/components/ui/SelectionChip";
import { Toggle } from "@/components/ui/Toggle";
import { getMe } from "@/services/user";
import type { MeResponse } from "@/types/api";

export default function ParametresPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [mealAlerts, setMealAlerts] = useState(true);
  const [shoppingAlerts, setShoppingAlerts] = useState(true);
  const [discoverAlerts, setDiscoverAlerts] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMe();
        setMe(data);
      } catch {
        // fallback silently
      }
    };
    void load();
  }, []);

  const diets = (me?.dietPreferences || "Végétarien, Sans Gluten, Paléo").split(",").map((v) => v.trim());
  const intolerances = me?.intolerances || "Lactose, Arachides, Crustacés";

  return (
    <div className="space-y-8">
      <MotionFadeIn>
        <h1 className="page-title">Paramètres</h1>
        <p className="mt-2 text-[var(--color-on-surface-soft)]">Personnalisez votre sanctuaire culinaire digital.</p>
      </MotionFadeIn>

      <MotionFadeIn delay={0.05}>
        <Card elevated className="space-y-6">
          <div>
            <h2 className="section-title">Mon ADN Culinaire</h2>
            <p className="text-sm text-[var(--color-on-surface-soft)]">Définissez vos rituels et préférences alimentaires.</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Régime alimentaire</p>
            <div className="flex flex-wrap gap-2">
              {diets.map((diet) => (
                <SelectionChip key={diet} label={diet} selected />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Intolérances</p>
            <div className="mt-2 rounded-2xl bg-[var(--color-surface-low)] px-4 py-3 text-sm">{intolerances}</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[var(--color-surface-low)] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Objectif nutrition</p>
              <p className="mt-2 text-2xl font-bold">{me?.kcalGoal || 2100} kcal</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-low)] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Hydratation</p>
              <p className="mt-2 text-2xl font-bold">{((me?.hydrationGoalMl || 2500) / 1000).toFixed(1)} L</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-low)] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Niveau cuisine</p>
              <p className="mt-2 text-2xl font-bold">Initié</p>
            </div>
          </div>
        </Card>
      </MotionFadeIn>

      <MotionFadeIn delay={0.08}>
        <Card elevated className="space-y-5">
          <h2 className="section-title">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface-low)] p-4">
              <div>
                <p className="font-semibold">Rappels de repas</p>
                <p className="text-sm text-[var(--color-on-surface-soft)]">Recevez une notification 30 min avant chaque rituel.</p>
              </div>
              <Toggle checked={mealAlerts} onChange={setMealAlerts} />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface-low)] p-4">
              <div>
                <p className="font-semibold">Liste de courses automatique</p>
                <p className="text-sm text-[var(--color-on-surface-soft)]">Génération chaque dimanche matin.</p>
              </div>
              <Toggle checked={shoppingAlerts} onChange={setShoppingAlerts} />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface-low)] p-4">
              <div>
                <p className="font-semibold">Nouveautés & Recettes</p>
                <p className="text-sm text-[var(--color-on-surface-soft)]">Découvertes éditoriales des nutritionnistes.</p>
              </div>
              <Toggle checked={discoverAlerts} onChange={setDiscoverAlerts} />
            </div>
          </div>
        </Card>
      </MotionFadeIn>

      <MotionFadeIn delay={0.1}>
        <Card elevated className="space-y-5 opacity-60">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Profils Famille</h2>
            <span className="rounded-full bg-[var(--color-surface-low)] px-3 py-1 text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">
              Bientôt disponible
            </span>
          </div>
          <p className="text-sm text-[var(--color-on-surface-soft)]">
            Gérez plusieurs profils (enfants, conjoint, seniors) et adaptez les menus à chaque besoin.
          </p>
          <button
            type="button"
            disabled
            title="Fonctionnalité à venir"
            className="cursor-not-allowed rounded-2xl bg-[var(--color-surface-low)] px-5 py-3 text-sm text-[var(--color-on-surface-soft)]"
          >
            Ajouter un membre
          </button>
        </Card>
      </MotionFadeIn>

      <MotionFadeIn delay={0.12}>
        <Card elevated className="space-y-5">
          <h2 className="section-title">Compte & Sécurité</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-surface-low)] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Email</p>
              <p className="mt-2">{me?.email || "elena.rose@studio.com"}</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-low)] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Mot de passe</p>
              <p className="mt-2">••••••••••</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[rgba(159,64,61,0.12)] px-4 py-3 text-sm text-[var(--color-error)]">
            Vérification requise : mettez à jour vos informations de paiement pour conserver vos accès premium.
          </div>
        </Card>
      </MotionFadeIn>
    </div>
  );
}
