import { Card } from "@/components/ui/Card";
import type { RecipeResponse } from "@/types/api";

interface RecipeCardProps {
  recipe: RecipeResponse;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.totalMinutes ?? (recipe.prepMinutes ?? 0) + (recipe.cookMinutes ?? 0);

  return (
    <Card elevated className="overflow-hidden p-0">
      <img
        src={
          recipe.imageUrl ||
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=80&auto=format&fit=crop"
        }
        alt={recipe.title}
        className="h-56 w-full object-cover"
      />
      <div className="space-y-2 p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-on-surface-soft)]">{recipe.category || "Recette"}</p>
        <h3 className="font-manrope text-3xl font-semibold leading-tight text-[var(--color-on-surface)]">{recipe.title}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-on-surface-soft)]">{recipe.description}</p>
        <p className="text-xs font-semibold text-[var(--color-primary)]">{totalTime ? `${totalTime} min` : "Temps flexible"}</p>
      </div>
    </Card>
  );
}
