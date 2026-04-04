"use client";

import { useEffect, useMemo, useState } from "react";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { Card } from "@/components/ui/Card";
import { NutritionRing } from "@/components/ui/NutritionRing";
import { CalorieDrawer } from "@/components/features/CalorieDrawer";
import { getMe } from "@/services/user";
import { getRecipes } from "@/services/recipes";
import { getCurrentWeekPlan } from "@/services/planning";
import { getTodayMealLog } from "@/services/mealLog";
import type { CurrentWeekPlanResponse, DailyLogResponse, MeResponse, RecipeResponse } from "@/types/api";

const fallbackRecipes: RecipeResponse[] = [
  {
    id: "1",
    title: "Cuisine les racines d'hiver",
    description: "Découvrez comment transformer les légumes anciens en chefs-d'oeuvre.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80&auto=format&fit=crop",
    category: "Saisonnier",
    seasonTags: "Hiver",
    servings: 2,
    prepMinutes: 10,
    cookMinutes: 20,
    totalMinutes: 30,
    kcalPerServing: 420,
    proteinG: 18,
    carbG: 45,
    fatG: 14,
    isPublic: true,
    authorUserId: "1",
    authorUsername: "elena",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Le pouvoir des Oméga-3",
    description: "Pourquoi les graisses saines sont vos meilleures alliées.",
    imageUrl: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1200&q=80&auto=format&fit=crop",
    category: "Équilibre",
    seasonTags: "Printemps",
    servings: 2,
    prepMinutes: 12,
    cookMinutes: 8,
    totalMinutes: 20,
    kcalPerServing: 350,
    proteinG: 22,
    carbG: 26,
    fatG: 16,
    isPublic: true,
    authorUserId: "1",
    authorUsername: "elena",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Protéines Vertes : Le Guide",
    description: "Privilégier une récupération musculaire optimale.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&auto=format&fit=crop",
    category: "Végétal",
    seasonTags: "Toute l'année",
    servings: 2,
    prepMinutes: 20,
    cookMinutes: 0,
    totalMinutes: 20,
    kcalPerServing: 280,
    proteinG: 20,
    carbG: 18,
    fatG: 11,
    isPublic: true,
    authorUserId: "1",
    authorUsername: "elena",
    createdAt: new Date().toISOString(),
  },
];

export default function DashboardPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [planning, setPlanning] = useState<CurrentWeekPlanResponse | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyLogResponse | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [meData, recipesData, planningData, logData] = await Promise.all([
          getMe(),
          getRecipes(),
          getCurrentWeekPlan(),
          getTodayMealLog(),
        ]);
        setMe(meData);
        setRecipes(recipesData.slice(0, 3));
        setPlanning(planningData);
        setDailyLog(logData);
      } catch {
        setRecipes(fallbackRecipes);
      }
    };
    void load();
  }, []);

  const kcalGoal = me?.kcalGoal ?? 2000;
  const consumed = useMemo(() => {
    if (dailyLog) return dailyLog.totalKcal ?? 0;
    if (!planning?.slots?.length || !recipes.length) return 1450;
    const plannedRecipes = planning.slots
      .map((slot) => recipes.find((recipe) => recipe.id === slot.recipeId))
      .filter(Boolean) as RecipeResponse[];
    return plannedRecipes.reduce((sum, recipe) => sum + (recipe.kcalPerServing ?? 0), 0);
  }, [dailyLog, planning?.slots, recipes]);

  return (
    <div className="space-y-12">
      <MotionFadeIn>
        <h1 className="page-title">Tableau de bord</h1>
        <p className="mt-3 text-lg text-[var(--color-on-surface-soft)]">Votre voyage vers l&apos;équilibre continue.</p>
      </MotionFadeIn>

      <section className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <MotionFadeIn delay={0.05}>
          <Card elevated className="h-full">
            <NutritionRing
              value={consumed}
              max={kcalGoal}
              label="Énergie Quotidienne"
              subLabel={`Vous êtes à ${Math.round((consumed / kcalGoal) * 100)}% de votre objectif`}
              onClick={() => setIsDrawerOpen(true)}
            />
          </Card>
        </MotionFadeIn>

        <MotionFadeIn delay={0.08}>
          <Card elevated className="space-y-5">
            <h2 className="section-title">Planning de la semaine</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {(planning?.slots ?? []).slice(0, 4).map((slot) => (
                <div key={slot.id} className="rounded-2xl bg-[var(--color-surface-low)] p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">{slot.mealType}</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--color-on-surface)]">{slot.recipeTitle || "Ajouter un repas"}</p>
                </div>
              ))}
              {!planning?.slots?.length ? <p className="text-sm text-[var(--color-on-surface-soft)]">Planning indisponible.</p> : null}
            </div>
          </Card>
        </MotionFadeIn>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <MotionFadeIn delay={0.1}>
          <Card elevated className="h-full space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-primary)]">Astuce d&apos;apothicaire</p>
            <h3 className="font-manrope text-4xl font-semibold leading-tight">Le rituel de l&apos;ortie</h3>
            <p className="text-[var(--color-on-surface-soft)]">
              Une infusion d&apos;ortie fraîche le matin favorise la reminéralisation naturelle et libère vos nutriments essentiels.
            </p>
          </Card>
        </MotionFadeIn>

        <MotionFadeIn delay={0.12}>
          <div className="grid gap-6 md:grid-cols-3">
            {recipes.map((recipe) => (
              <Card key={recipe.id} elevated className="overflow-hidden p-0">
                <img
                  src={
                    recipe.imageUrl ||
                    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1000&q=80&auto=format&fit=crop"
                  }
                  alt={recipe.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">{recipe.category || "Inspiration"}</p>
                  <p className="mt-2 text-lg font-semibold">{recipe.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </MotionFadeIn>
      </section>
      <CalorieDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} log={dailyLog} onUpdated={setDailyLog} />
    </div>
  );
}
