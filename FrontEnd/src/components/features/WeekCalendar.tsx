"use client";

import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import type { MealSlotResponse } from "@/types/api";

interface WeekCalendarProps {
  slots: MealSlotResponse[];
  weekStartDate: string;
  onAdd: (dayOfWeek: number, mealType: "BREAKFAST" | "LUNCH" | "DINNER") => void;
  onEdit: (slot: MealSlotResponse) => void;
  onDelete: (slotId: string) => void;
}

const days = [
  { dayOfWeek: 1, label: "Lun" },
  { dayOfWeek: 2, label: "Mar" },
  { dayOfWeek: 3, label: "Mer" },
  { dayOfWeek: 4, label: "Jeu" },
  { dayOfWeek: 5, label: "Ven" },
  { dayOfWeek: 6, label: "Sam" },
  { dayOfWeek: 7, label: "Dim" },
];

const meals = [
  { mealType: "BREAKFAST", label: "Matin" },
  { mealType: "LUNCH", label: "Midi" },
  { mealType: "DINNER", label: "Soir" },
] as const;

function plusDays(dateStr: string, daysToAdd: number) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

export function WeekCalendar({ slots, weekStartDate, onAdd, onEdit, onDelete }: WeekCalendarProps) {
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[920px] grid-cols-[120px_repeat(7,minmax(110px,1fr))] gap-2">
        <div />
        {days.map((day) => (
          <div key={day.dayOfWeek} className="rounded-xl bg-[var(--color-surface-high)] p-3 text-center">
            <p className="text-xs uppercase text-[var(--color-on-surface-soft)]">{day.label}</p>
            <p className="text-sm font-semibold">{plusDays(weekStartDate, day.dayOfWeek - 1)}</p>
          </div>
        ))}

        {meals.map((meal) => (
          <Fragment key={meal.mealType}>
            <div className="rounded-xl bg-[var(--color-surface-high)] p-3 text-sm font-semibold">
              {meal.label}
            </div>
            {days.map((day) => {
              const slot = slots.find((s) => s.dayOfWeek === day.dayOfWeek && s.mealType === meal.mealType);
              return (
                <div key={`${meal.mealType}-${day.dayOfWeek}`} className="min-h-28 rounded-xl bg-[var(--color-surface-low)] p-2">
                  {slot ? (
                    <div className="flex h-full flex-col justify-between">
                      <p className="text-sm font-medium">{slot.recipeTitle || slot.note || "Repas planifié"}</p>
                      <div className="mt-2 flex gap-1">
                        <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => onEdit(slot)}>
                          Edit
                        </Button>
                        <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => onDelete(slot.id)}>
                          Suppr
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAdd(day.dayOfWeek, meal.mealType)}
                      className="h-full w-full rounded-lg border border-dashed border-[var(--color-outline)] text-2xl text-[var(--color-on-surface-soft)]"
                    >
                      +
                    </button>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
