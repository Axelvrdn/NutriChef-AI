"use client";

import { useEffect, useState } from "react";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { Card } from "@/components/ui/Card";
import { AddSlotModal } from "@/components/features/AddSlotModal";
import { WeekCalendar } from "@/components/features/WeekCalendar";
import { getRecipes } from "@/services/recipes";
import { addPlanningSlot, deletePlanningSlot, getWeekPlan, updatePlanningSlot } from "@/services/planning";
import type { CurrentWeekPlanResponse, MealSlotResponse, RecipeResponse } from "@/types/api";

function getWeekMonday(base: Date) {
  const date = new Date(base);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function CalendrierPage() {
  const [plan, setPlan] = useState<CurrentWeekPlanResponse | null>(null);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [weekStart, setWeekStart] = useState<string>(toIsoDate(getWeekMonday(new Date())));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<MealSlotResponse | undefined>(undefined);
  const [initialDay, setInitialDay] = useState<number>(1);
  const [initialMeal, setInitialMeal] = useState<"BREAKFAST" | "LUNCH" | "DINNER">("LUNCH");

  useEffect(() => {
    const load = async () => {
      try {
        const [data, recipesData] = await Promise.all([getWeekPlan(weekStart), getRecipes()]);
        setPlan(data);
        setRecipes(recipesData);
      } catch {
        setPlan(null);
      }
    };
    void load();
  }, [weekStart]);

  const moveWeek = (delta: number) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + delta * 7);
    setWeekStart(toIsoDate(getWeekMonday(date)));
  };

  const openAddModal = (dayOfWeek: number, mealType: "BREAKFAST" | "LUNCH" | "DINNER") => {
    setEditingSlot(undefined);
    setInitialDay(dayOfWeek);
    setInitialMeal(mealType);
    setIsModalOpen(true);
  };

  const openEditModal = (slot: MealSlotResponse) => {
    if (slot.mealType === "SNACK") return;
    setEditingSlot(slot);
    setInitialDay(slot.dayOfWeek);
    setInitialMeal(slot.mealType);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <MotionFadeIn>
        <h1 className="page-title">Calendrier</h1>
        <p className="mt-2 text-[var(--color-on-surface-soft)]">Votre flow repas pour la semaine du {weekStart}.</p>
      </MotionFadeIn>

      <MotionFadeIn delay={0.05}>
        <Card elevated className="space-y-8 bg-[var(--color-surface-low)] p-8">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Semaine 7 x 3</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => moveWeek(-1)} className="rounded-xl bg-[var(--color-surface-high)] px-3 py-1.5">
                ← Semaine précédente
              </button>
              <button type="button" onClick={() => moveWeek(1)} className="rounded-xl bg-[var(--color-surface-high)] px-3 py-1.5">
                Semaine suivante →
              </button>
            </div>
          </div>
          <WeekCalendar
            slots={plan?.slots ?? []}
            weekStartDate={plan?.weekStartDate ?? weekStart}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={async (slotId) => {
              const updated = await deletePlanningSlot(slotId);
              setPlan(updated);
            }}
          />
        </Card>
      </MotionFadeIn>
      <AddSlotModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipes={recipes}
        initial={{
          ...editingSlot,
          dayOfWeek: editingSlot?.dayOfWeek ?? initialDay,
          mealType: editingSlot?.mealType ?? initialMeal,
        }}
        onSubmit={async (payload) => {
          if (editingSlot) {
            const updated = await updatePlanningSlot(editingSlot.id, payload);
            setPlan(updated);
            return;
          }
          const updated = await addPlanningSlot({ ...payload, weekStart });
          setPlan(updated);
        }}
      />
    </div>
  );
}
