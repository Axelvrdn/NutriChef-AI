export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <div>
          <h1 className="font-manrope text-3xl font-bold text-[var(--color-on-surface)]">NutriFlow</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-on-surface-soft)]">Digital Apothecary</p>
        </div>
        <p className="text-sm text-[var(--color-on-surface-soft)]">Première ouverture</p>
      </header>
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-2 rounded-full bg-[var(--color-surface-low)]">
          <div className="h-2 w-1/5 rounded-full bg-[var(--color-primary)]" />
        </div>
      </div>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
