"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: "◫" },
  { href: "/recettes", label: "Mes Recettes", icon: "✕" },
  { href: "/calendrier", label: "Calendrier", icon: "◷" },
  { href: "/decouvrir", label: "Découvrir", icon: "◔" },
  { href: "/parametres", label: "Paramètres", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  return (
    <aside className="sticky top-6 flex h-[calc(100vh-3rem)] w-72 flex-col justify-between rounded-3xl bg-[var(--color-surface-low)] p-6">
      <div>
        <div className="mb-10">
          <h1 className="font-manrope text-3xl font-bold text-[var(--color-on-surface)]">NutriFlow</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-on-surface-soft)]">Digital Apothecary</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = currentPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
                  active
                    ? "bg-[var(--color-surface-card)] text-[var(--color-on-surface)] shadow-[var(--shadow-ambient)]"
                    : "text-[var(--color-on-surface-soft)] hover:bg-[var(--color-surface-high)]"
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <Button className="w-full">Générer la liste Leclerc</Button>
    </aside>
  );
}
