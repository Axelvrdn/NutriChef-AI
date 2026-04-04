"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { addMealLogItem } from "@/services/mealLog";
import type { DailyLogResponse } from "@/types/api";

interface CalorieDrawerProps {
  open: boolean;
  onClose: () => void;
  log: DailyLogResponse | null;
  onUpdated: (next: DailyLogResponse) => void;
}

type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

const mealTypeLabels: Record<MealType, string> = {
  BREAKFAST: "Matin",
  LUNCH: "Midi",
  DINNER: "Soir",
  SNACK: "Snack",
};

export function CalorieDrawer({ open, onClose, log, onUpdated }: CalorieDrawerProps) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    mealType: "SNACK" as MealType,
    label: "",
    quantity: 1,
    unit: "portion",
    kcal: 100,
    proteinG: 0,
    carbG: 0,
    fatG: 0,
  });

  if (!open) return null;

  const totalMacros = Math.max((log?.totalProteinG ?? 0) + (log?.totalCarbG ?? 0) + (log?.totalFatG ?? 0), 1);
  const proteinPct = ((log?.totalProteinG ?? 0) / totalMacros) * 100;
  const carbPct = ((log?.totalCarbG ?? 0) / totalMacros) * 100;
  const fatPct = ((log?.totalFatG ?? 0) / totalMacros) * 100;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const updated = await addMealLogItem({
        mealType: form.mealType,
        label: form.label,
        quantity: Number(form.quantity),
        unit: form.unit,
        kcal: Number(form.kcal),
        proteinG: Number(form.proteinG),
        carbG: Number(form.carbG),
        fatG: Number(form.fatG),
      });
      setForm({ ...form, label: "" });
      onUpdated(updated);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button type="button" onClick={onClose} className="fixed inset-0 z-40 bg-black/40" aria-label="Fermer le journal calorique" />
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto bg-[var(--color-surface-card)] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[var(--color-on-surface)]">Journal calorique</h3>
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
        </div>

        <div className="mb-6 rounded-2xl bg-[var(--color-surface-low)] p-4">
          <p className="text-sm text-[var(--color-on-surface-soft)]">Total du jour</p>
          <p className="text-3xl font-semibold text-[var(--color-on-surface)]">{Math.round(log?.totalKcal ?? 0)} kcal</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl bg-emerald-100 px-2 py-1">Prot. {proteinPct.toFixed(0)}%</div>
            <div className="rounded-xl bg-amber-100 px-2 py-1">Gluc. {carbPct.toFixed(0)}%</div>
            <div className="rounded-xl bg-rose-100 px-2 py-1">Lip. {fatPct.toFixed(0)}%</div>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <h4 className="text-sm uppercase tracking-[0.12em] text-[var(--color-primary)]">Entrées</h4>
          {(log?.items ?? []).length === 0 ? (
            <p className="text-sm text-[var(--color-on-surface-soft)]">Aucune entrée pour le moment.</p>
          ) : (
            (log?.items ?? []).map((item) => (
              <div key={item.id} className="rounded-xl bg-[var(--color-surface-low)] p-3">
                <p className="font-medium text-[var(--color-on-surface)]">
                  {item.label} - {item.kcal ?? 0} kcal
                </p>
                <p className="text-xs text-[var(--color-on-surface-soft)]">
                  {mealTypeLabels[item.mealType]} · {item.quantity} {item.unit}
                </p>
              </div>
            ))
          )}
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <h4 className="text-sm uppercase tracking-[0.12em] text-[var(--color-primary)]">Ajouter manuellement</h4>
          <input
            value={form.label}
            onChange={(event) => setForm({ ...form, label: event.target.value })}
            required
            placeholder="Nom du repas"
            className="w-full rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={form.mealType}
              onChange={(event) => setForm({ ...form, mealType: event.target.value as MealType })}
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            >
              {Object.entries(mealTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={form.kcal}
              min={0}
              onChange={(event) => setForm({ ...form, kcal: Number(event.target.value) })}
              placeholder="kcal"
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min={0}
              value={form.quantity}
              onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })}
              placeholder="Quantité"
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            />
            <input
              value={form.unit}
              onChange={(event) => setForm({ ...form, unit: event.target.value })}
              placeholder="Unité"
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              min={0}
              value={form.proteinG}
              onChange={(event) => setForm({ ...form, proteinG: Number(event.target.value) })}
              placeholder="Prot (g)"
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            />
            <input
              type="number"
              min={0}
              value={form.carbG}
              onChange={(event) => setForm({ ...form, carbG: Number(event.target.value) })}
              placeholder="Gluc (g)"
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            />
            <input
              type="number"
              min={0}
              value={form.fatG}
              onChange={(event) => setForm({ ...form, fatG: Number(event.target.value) })}
              placeholder="Lip (g)"
              className="rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
            />
          </div>
          <Button type="submit" disabled={saving || !form.label.trim()}>
            {saving ? "Ajout..." : "Ajouter au journal"}
          </Button>
        </form>
      </aside>
    </>
  );
}
