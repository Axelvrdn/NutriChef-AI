"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import type { MealSlotResponse } from "@/types/api";

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  slots: MealSlotResponse[];
}

const dayLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function toMealLabel(mealType: MealSlotResponse["mealType"]) {
  if (mealType === "BREAKFAST") return "Matin";
  if (mealType === "LUNCH") return "Midi";
  if (mealType === "DINNER") return "Soir";
  return "Snack";
}

export function NotificationPanel({ open, onClose, slots }: NotificationPanelProps) {
  const todaySlots = useMemo(() => {
    const jsDay = new Date().getDay();
    const dayOfWeek = jsDay === 0 ? 7 : jsDay;
    return slots.filter((slot) => slot.dayOfWeek === dayOfWeek);
  }, [slots]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Fermer le panneau notifications"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-[var(--color-surface-card)] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[var(--color-on-surface)]">Notifications</h3>
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
        </div>

        <section className="mb-8">
          <h4 className="mb-3 text-sm uppercase tracking-[0.12em] text-[var(--color-primary)]">Repas du jour</h4>
          <div className="space-y-3">
            {todaySlots.length > 0 ? (
              todaySlots.map((slot) => (
                <div key={slot.id} className="rounded-2xl bg-[var(--color-surface-low)] p-3">
                  <p className="text-xs text-[var(--color-on-surface-soft)]">
                    {dayLabels[slot.dayOfWeek - 1]} · {toMealLabel(slot.mealType)}
                  </p>
                  <p className="mt-1 font-medium text-[var(--color-on-surface)]">{slot.recipeTitle || slot.note || "Repas à définir"}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--color-on-surface-soft)]">Aucun repas planifié aujourd&apos;hui.</p>
            )}
          </div>
        </section>

        <section>
          <h4 className="mb-3 text-sm uppercase tracking-[0.12em] text-[var(--color-primary)]">Activité sociale</h4>
          <p className="rounded-2xl bg-[var(--color-surface-low)] p-3 text-sm text-[var(--color-on-surface-soft)]">
            Aucune nouvelle notification.
          </p>
        </section>
      </aside>
    </>
  );
}
