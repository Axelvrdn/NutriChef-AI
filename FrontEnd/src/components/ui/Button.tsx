"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  const variantClass =
    variant === "primary"
      ? "bg-[linear-gradient(145deg,var(--color-primary),var(--color-primary-dim))] text-white shadow-[var(--shadow-ambient)] hover:translate-y-[-1px]"
      : "bg-transparent text-[var(--color-on-surface)] hover:bg-[var(--color-surface-high)]";

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-[1.5rem] px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${variantClass} ${
        className ?? ""
      }`}
      {...props}
    />
  );
});
