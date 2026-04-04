"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="grid min-h-screen place-items-center text-[var(--color-on-surface-soft)]">Chargement...</div>;
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <main className="rounded-3xl bg-[var(--color-surface)] p-4 md:p-8">
        <Header />
        {children}
        <footer className="mt-16 border-none py-8 text-center text-xs uppercase tracking-[0.18em] text-[var(--color-on-surface-soft)]">
          NutriFlow © 2026 · Confidentialité · Conditions · Aide
        </footer>
      </main>
    </div>
  );
}
