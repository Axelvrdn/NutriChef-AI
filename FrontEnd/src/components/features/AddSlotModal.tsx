"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { MealSlotResponse, RecipeResponse } from "@/types/api";

interface AddSlotModalProps {
  open: boolean;
  initial?: Partial<MealSlotResponse>;
  recipes: RecipeResponse[];
  onClose: () => void;
  onSubmit: (payload: {
    dayOfWeek: number;
    mealType: "BREAKFAST" | "LUNCH" | "DINNER";
    locationType: "HOME" | "RESTAURANT" | "OUTSIDE";
    recipeId?: string | null;
    note?: string;
  }) => Promise<void>;
}

const mealTypes = [
  { value: "BREAKFAST", label: "Matin" },
  { value: "LUNCH", label: "Midi" },
  { value: "DINNER", label: "Soir" },
] as const;

export function AddSlotModal({ open, initial, recipes, onClose, onSubmit }: AddSlotModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    dayOfWeek: initial?.dayOfWeek ?? 1,
    mealType: (initial?.mealType as "BREAKFAST" | "LUNCH" | "DINNER") ?? "LUNCH",
    locationType: (initial?.locationType as "HOME" | "RESTAURANT" | "OUTSIDE") ?? "HOME",
    recipeId: initial?.recipeId ?? "",
    note: initial?.note ?? "",
  });

  const recipeOptions = useMemo(() => recipes.slice(0, 80), [recipes]);

  useEffect(() => {
    if (!open) return;
    setForm({
      dayOfWeek: initial?.dayOfWeek ?? 1,
      mealType: (initial?.mealType as "BREAKFAST" | "LUNCH" | "DINNER") ?? "LUNCH",
      locationType: (initial?.locationType as "HOME" | "RESTAURANT" | "OUTSIDE") ?? "HOME",
      recipeId: initial?.recipeId ?? "",
      note: initial?.note ?? "",
    });
  }, [open, initial]);

  if (!open) return null;

  return (
    <>
      <button type="button" onClick={onClose} className="fixed inset-0 z-40 bg-black/40" aria-label="Fermer la modale" />
      <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[var(--color-surface-card)] p-6 shadow-2xl">
        <h3 className="text-xl font-semibold">Ajouter un créneau</h3>
        <form
          className="mt-4 space-y-3"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
              await onSubmit({
                dayOfWeek: form.dayOfWeek,
                mealType: form.mealType,
                locationType: form.locationType,
                recipeId: form.recipeId || null,
                note: form.note || undefined,
              });
              onClose();
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <select
              value={form.dayOfWeek}
              onChange={(event) => setForm({ ...form, dayOfWeek: Number(event.target.value) })}
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            >
              <option value={1}>Lundi</option>
              <option value={2}>Mardi</option>
              <option value={3}>Mercredi</option>
              <option value={4}>Jeudi</option>
              <option value={5}>Vendredi</option>
              <option value={6}>Samedi</option>
              <option value={7}>Dimanche</option>
            </select>
            <select
              value={form.mealType}
              onChange={(event) => setForm({ ...form, mealType: event.target.value as "BREAKFAST" | "LUNCH" | "DINNER" })}
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            >
              {mealTypes.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <select
            value={form.locationType}
            onChange={(event) => setForm({ ...form, locationType: event.target.value as "HOME" | "RESTAURANT" | "OUTSIDE" })}
            className="w-full rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
          >
            <option value="HOME">Maison</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="OUTSIDE">Extérieur</option>
          </select>
          <select
            value={form.recipeId}
            onChange={(event) => setForm({ ...form, recipeId: event.target.value })}
            className="w-full rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
          >
            <option value="">Saisie libre</option>
            {recipeOptions.map((recipe) => (
              <option key={recipe.id} value={recipe.id}>
                {recipe.title}
              </option>
            ))}
          </select>
          <input
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
            placeholder="Titre libre / note"
            className="w-full rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
