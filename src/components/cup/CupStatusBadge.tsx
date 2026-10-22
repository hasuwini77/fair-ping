"use client";

import type { Cup, CupStatus } from "@/data/cups";
import { getCupStatus } from "@/lib/time";
import { useNow } from "@/lib/useNow";

const BASE = "inline-flex items-center gap-2 rounded-md border px-2 py-1 text-sm";
const STYLE: Record<CupStatus, { cls: string; label: string }> = {
  upcoming: { cls: "border-line text-paper", label: "Upcoming" },
  live: { cls: "border-accent bg-accent font-medium text-ink", label: "Live now" },
  done: { cls: "border-transparent bg-panel text-muted", label: "Done" },
};

export function CupStatusBadge({ cup }: { cup: Pick<Cup, "startsAt" | "results"> }) {
  const status = getCupStatus(cup, useNow());
  const { cls, label } = STYLE[status];
  return (
    <span className={`${BASE} ${cls}`}>
      {status === "live" ? <span aria-hidden="true" className="size-2 rounded-full bg-ink" /> : null}
      {label}
    </span>
  );
}
