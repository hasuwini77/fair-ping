import type { ReactNode } from "react";
import { formatUsd } from "@/lib/money";

export function Meter({
  label,
  detail,
  usd,
  capUsd,
}: {
  label: string;
  detail?: ReactNode;
  usd: number;
  capUsd: number;
}) {
  const shown = Math.max(0, usd);
  const pct = Math.round(Math.min(100, (shown / capUsd) * 100) * 100) / 100;
  const near = usd / capUsd >= 0.8;
  const value = `${formatUsd(usd)} of ${formatUsd(capUsd)}`;
  return (
    <div role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={capUsd} aria-valuenow={shown} aria-valuetext={value}>
      <p className="flex items-baseline justify-between gap-4 text-sm">
        <span className="text-muted">{label}</span>
        <span className="text-right tabular-nums">
          {formatUsd(usd)} <span className="text-muted">{`of ${formatUsd(capUsd)}`}</span>
          {near ? " · Near cap" : null}
        </span>
      </p>
      {detail ? <p className="mt-1 text-sm text-muted tabular-nums">{detail}</p> : null}
      <div aria-hidden="true" className="mt-2 h-2 rounded-full bg-panel">
        <div className={`h-2 rounded-full bg-accent ${shown > 0 ? "min-w-1" : ""}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
