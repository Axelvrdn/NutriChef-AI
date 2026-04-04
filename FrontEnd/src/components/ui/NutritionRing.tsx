interface NutritionRingProps {
  value: number;
  max: number;
  label: string;
  subLabel?: string;
  onClick?: () => void;
}

export function NutritionRing({ value, max, label, subLabel, onClick }: NutritionRingProps) {
  const normalizedMax = Math.max(max, 1);
  const pct = Math.min(value / normalizedMax, 1);
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const stroke = circumference - pct * circumference;

  const content = (
    <>
      <svg width="190" height="190" viewBox="0 0 190 190" aria-label={label}>
        <circle
          cx="95"
          cy="95"
          r={radius}
          fill="none"
          stroke="var(--color-primary-container)"
          strokeWidth="12"
        />
        <circle
          cx="95"
          cy="95"
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeLinecap="round"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={stroke}
          transform="rotate(-90 95 95)"
        />
        <text x="95" y="93" textAnchor="middle" className="fill-[var(--color-on-surface)] text-3xl font-bold">
          {Math.round(value)}
        </text>
        <text x="95" y="112" textAnchor="middle" className="fill-[var(--color-on-surface-soft)] text-xs">
          / {Math.round(max)} kcal
        </text>
      </svg>
      <div className="text-center">
        <p className="text-lg font-semibold text-[var(--color-on-surface)]">{label}</p>
        {subLabel ? <p className="text-sm text-[var(--color-on-surface-soft)]">{subLabel}</p> : null}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full flex-col items-center gap-4 rounded-3xl p-2 text-left transition hover:bg-[var(--color-surface-low)]"
      >
        {content}
      </button>
    );
  }

  return <div className="flex flex-col items-center gap-4">{content}</div>;
}
