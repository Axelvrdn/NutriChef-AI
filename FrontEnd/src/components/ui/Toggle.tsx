"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        checked ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface-high)]"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  );
}
