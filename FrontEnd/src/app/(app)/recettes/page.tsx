"use client";

import { useEffect, useMemo, useState } from "react";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { SelectionChip } from "@/components/ui/SelectionChip";
import { RecipeCard } from "@/components/features/RecipeCard";
import { getRecipes } from "@/services/recipes";
import type { RecipeResponse } from "@/types/api";

const filters = ["Tout", "Petit-déjeuner", "Déjeuner", "Dîner", "Saison : Printemps"];

const fallbackRecipes: RecipeResponse[] = [
  {
    id: "r1",
    title: "Bol de Quinoa Vert & Tahini",
    description: "Un mélange vibrant de pousses d'épinards, brocolis croquants et sauce crémeuse.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&auto=format&fit=crop",
    category: "Petit-déjeuner",
    seasonTags: "Printemps",
    servings: 2,
    prepMinutes: 15,
    cookMinutes: 0,
    totalMinutes: 15,
    kcalPerServing: 410,
    proteinG: 21,
    carbG: 45,
    fatG: 15,
    isPublic: true,
    authorUserId: "u1",
    authorUsername: "elena",
    createdAt: new Date().toISOString(),
  },
  {
    id: "r2",
    title: "Velouté de Courge & Sauge",
    description: "La douceur de la courge butternut relevée par des éclats de noisettes grillées.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80&auto=format&fit=crop",
    category: "Déjeuner",
    seasonTags: "Automne",
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 25,
    totalMinutes: 35,
    kcalPerServing: 320,
    proteinG: 12,
    carbG: 36,
    fatG: 12,
    isPublic: true,
    authorUserId: "u1",
    authorUsername: "elena",
    createdAt: new Date().toISOString(),
  },
  {
    id: "r3",
    title: "Linguine au Pesto de Roquette",
    description: "Une interprétation moderne du pesto classique, plus poivrée et rafraîchissante.",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&q=80&auto=format&fit=crop",
    category: "Dîner",
    seasonTags: "Printemps",
    servings: 2,
    prepMinutes: 5,
    cookMinutes: 15,
    totalMinutes: 20,
    kcalPerServing: 550,
    proteinG: 19,
    carbG: 60,
    fatG: 20,
    isPublic: true,
    authorUserId: "u1",
    authorUsername: "elena",
    createdAt: new Date().toISOString(),
  },
];

export default function RecettesPage() {
  const [selectedFilter, setSelectedFilter] = useState("Tout");
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch {
        setRecipes(fallbackRecipes);
      }
    };
    void load();
  }, []);

  const filtered = useMemo(() => {
    if (selectedFilter === "Tout") return recipes;
    if (selectedFilter === "Saison : Printemps") {
      return recipes.filter((recipe) => recipe.seasonTags?.toLowerCase().includes("printemps"));
    }
    return recipes.filter((recipe) => recipe.category?.toLowerCase().includes(selectedFilter.toLowerCase()));
  }, [recipes, selectedFilter]);

  return (
    <div className="space-y-8">
      <MotionFadeIn>
        <h1 className="page-title">Mes Recettes</h1>
      </MotionFadeIn>

      <MotionFadeIn delay={0.04} className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <SelectionChip key={filter} label={filter} selected={filter === selectedFilter} onClick={() => setSelectedFilter(filter)} />
        ))}
      </MotionFadeIn>

      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {filtered.map((recipe, index) => (
          <MotionFadeIn key={recipe.id} delay={0.06 + index * 0.03} className="mb-6 break-inside-avoid">
            <RecipeCard recipe={recipe} />
          </MotionFadeIn>
        ))}
      </div>
    </div>
  );
}
