import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({ elevated = false, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl bg-[var(--color-surface-card)] p-5 ${
        elevated ? "shadow-[var(--shadow-ambient)]" : ""
      } ${className}`}
      {...props}
    />
  );
}
