"use client";

import { useEffect, useState } from "react";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { Card } from "@/components/ui/Card";
import { getMe } from "@/services/user";
import { getRecipes } from "@/services/recipes";
import type { MeResponse, RecipeResponse } from "@/types/api";

export default function ProfilPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [meData, recipesData] = await Promise.all([getMe(), getRecipes()]);
        setMe(meData);
        setRecipes(recipesData.slice(0, 4));
      } catch {
        // Fallback léger pour garder la maquette visible.
      }
    };
    void load();
  }, []);

  return (
    <div className="space-y-8">
      <MotionFadeIn className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <img
          src={
            me?.avatarUrl ||
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop"
          }
          alt={me?.displayName || me?.username || "Profil"}
          className="h-52 w-52 rounded-full object-cover shadow-[var(--shadow-ambient)]"
        />
        <div className="space-y-4">
          <h1 className="page-title">{me?.displayName || me?.username || "Elena Rose"}</h1>
          <p className="text-xl text-[var(--color-primary)]">{me?.subtitle || "Culinary Alchemist & Wellness Guide"}</p>
          <p className="max-w-3xl text-[var(--color-on-surface-soft)]">
            {me?.bio ||
              "Passionné par la nutrition holistique. Je transforme des ingrédients simples en rituels de santé quotidiens."}
          </p>
          <div className="grid max-w-xl grid-cols-3 gap-3">
            <Card className="text-center">
              <p className="text-4xl font-bold">{recipes.length || 24}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Recettes</p>
            </Card>
            <Card className="text-center">
              <p className="text-4xl font-bold">1.2k</p>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Abonnés</p>
            </Card>
            <Card className="text-center">
              <p className="text-4xl font-bold">156</p>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-on-surface-soft)]">Testées</p>
            </Card>
          </div>
        </div>
      </MotionFadeIn>

      <section className="grid gap-6 md:grid-cols-2">
        {recipes.map((recipe, index) => (
          <MotionFadeIn key={recipe.id} delay={0.08 + index * 0.03}>
            <Card elevated className="overflow-hidden p-0">
              <img
                src={
                  recipe.imageUrl ||
                  "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80&auto=format&fit=crop"
                }
                alt={recipe.title}
                className="h-60 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-manrope text-3xl font-semibold">{recipe.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-on-surface-soft)]">{recipe.description}</p>
              </div>
            </Card>
          </MotionFadeIn>
        ))}
      </section>
    </div>
  );
}
