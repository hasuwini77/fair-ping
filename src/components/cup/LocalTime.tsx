"use client";

import { formatLocalTime, sameClockAsCupZone } from "@/lib/time";
import { useIsClient } from "@/lib/useNow";

/** Empty on the server and when the visitor shares the cup clock. Parents reserve the line. */
export function LocalTime({ startsAt }: { startsAt: string }) {
  const isClient = useIsClient();
  if (!isClient || sameClockAsCupZone(startsAt)) return null;
  const { time, zone } = formatLocalTime(startsAt);
  return <span className="tabular-nums text-muted">{`· ${time} your time (${zone})`}</span>;
}
