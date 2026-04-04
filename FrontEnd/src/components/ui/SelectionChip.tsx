"use client";

interface SelectionChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function SelectionChip({ label, selected = false, onClick }: SelectionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        selected
          ? "bg-[var(--color-primary)] text-white"
          : "bg-[var(--color-tertiary-container)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-high)]"
      }`}
    >
      {label}
    </button>
  );
}
