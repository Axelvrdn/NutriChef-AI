"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NotificationPanel } from "@/components/layout/NotificationPanel";
import { useAuth } from "@/hooks/useAuth";
import { getCurrentWeekPlan } from "@/services/planning";
import type { MealSlotResponse } from "@/types/api";

export function Header() {
  const { user } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [slots, setSlots] = useState<MealSlotResponse[]>([]);
  const displayName = user?.displayName || user?.username || "Invité";
  const avatarUrl = user?.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop";

  useEffect(() => {
    const load = async () => {
      try {
        const plan = await getCurrentWeekPlan();
        setSlots(plan.slots);
      } catch {
        setSlots([]);
      }
    };
    void load();
  }, []);

  return (
    <>
      <header className="mb-10 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => setIsNotificationsOpen(true)}
          className="h-10 w-10 rounded-full bg-[var(--color-surface-card)] text-lg text-[var(--color-on-surface)] shadow-[var(--shadow-ambient)]"
          aria-label="Notifications"
        >
          🔔
        </button>
        <Link href="/profil" className="flex items-center gap-3 rounded-full bg-[rgba(255,255,255,0.8)] px-4 py-2 backdrop-blur-xl">
          <span className="text-sm font-medium text-[var(--color-on-surface)]">{displayName}</span>
          <img src={avatarUrl} alt={displayName} className="h-9 w-9 rounded-full object-cover" />
        </Link>
      </header>
      <NotificationPanel open={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} slots={slots} />
    </>
  );
}
