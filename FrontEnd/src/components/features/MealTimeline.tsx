import { Card } from "@/components/ui/Card";
import type { MealSlotResponse } from "@/types/api";

interface MealTimelineProps {
  slots: MealSlotResponse[];
}

const dayLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function toMealLabel(value: MealSlotResponse["mealType"]): string {
  if (value === "BREAKFAST") return "Matin";
  if (value === "LUNCH") return "Midi";
  if (value === "DINNER") return "Soir";
  return "Snack";
}

export function MealTimeline({ slots }: MealTimelineProps) {
  const sorted = [...slots].sort((a, b) => {
    if (a.dayOfWeek === b.dayOfWeek) return a.mealType.localeCompare(b.mealType);
    return a.dayOfWeek - b.dayOfWeek;
  });

  return (
    <div className="relative mx-auto max-w-4xl before:absolute before:left-1/2 before:top-0 before:h-full before:w-[2px] before:-translate-x-1/2 before:bg-[var(--color-surface-high)]">
      <div className="space-y-8">
        {sorted.map((slot, index) => {
          const alignLeft = index % 2 === 0;
          return (
            <div key={slot.id} className={`grid grid-cols-1 md:grid-cols-2 ${alignLeft ? "" : "md:[&>*:first-child]:order-2"}`}>
              <div className={`px-4 ${alignLeft ? "md:pr-10" : "md:pl-10"}`}>
                <Card elevated className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">
                    {dayLabels[Math.max(0, slot.dayOfWeek - 1)]} · {toMealLabel(slot.mealType)}
                  </p>
                  <h4 className="text-xl font-semibold text-[var(--color-on-surface)]">{slot.recipeTitle || "Repas à définir"}</h4>
                  {slot.note ? <p className="text-sm text-[var(--color-on-surface-soft)]">{slot.note}</p> : null}
                </Card>
              </div>
              <div />
            </div>
          );
        })}
      </div>
    </div>
  );
}
