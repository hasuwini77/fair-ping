"use client";

import type { ReactNode } from "react";
import type { Cup } from "@/data/cups";
import { getCupStatus } from "@/lib/time";
import { useNow } from "@/lib/useNow";

/** Renders children only while the cup is upcoming. Server render counts as upcoming. */
export function UpcomingOnly({
  cup,
  children,
}: {
  cup: Pick<Cup, "startsAt" | "results">;
  children: ReactNode;
}) {
  return getCupStatus(cup, useNow()) === "upcoming" ? <>{children}</> : null;
}
