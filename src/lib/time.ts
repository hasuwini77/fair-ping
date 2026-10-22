import type { Cup, CupStatus } from "@/data/cups";

export const CUP_TIMEZONE = "Europe/Stockholm";
export const LIVE_WINDOW_MS = 14_400_000; // 4 h

export function cupStartMs(cup: Pick<Cup, "startsAt">): number {
  return Date.parse(cup.startsAt);
}

export function cupEndMs(cup: Pick<Cup, "startsAt">): number {
  return cupStartMs(cup) + LIVE_WINDOW_MS;
}

/** results non-empty = done; now null = upcoming; start <= now < end = live. */
export function getCupStatus(cup: Pick<Cup, "startsAt" | "results">, now: number | null): CupStatus {
  if (cup.results && cup.results.length > 0) return "done";
  if (now === null || now < cupStartMs(cup)) return "upcoming";
  if (now < cupEndMs(cup)) return "live";
  return "done";
}

/** Earliest startsAt with a status other than done. */
export function getNextCup(cups: readonly Cup[], now: number | null): Cup | undefined {
  let next: Cup | undefined;
  for (const cup of cups) {
    if (getCupStatus(cup, now) === "done") continue;
    if (!next || cupStartMs(cup) < cupStartMs(next)) next = cup;
  }
  return next;
}

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((p) => p.type === type)?.value ?? "";
}

/** SERVER ONLY: "Sun, 22 Nov 2026" */
export function formatCupDate(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: CUP_TIMEZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(new Date(iso));
  return `${part(parts, "weekday")}, ${part(parts, "day")} ${part(parts, "month")} ${part(parts, "year")}`;
}

/** SERVER ONLY: "19:00 CET" (CEST in summer) */
export function formatCetTime(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: CUP_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
  }).formatToParts(new Date(iso));
  return `${part(parts, "hour")}:${part(parts, "minute")} ${part(parts, "timeZoneName")}`;
}

export interface LabeledCup {
  cup: Cup;
  date: string;
  time: string;
}

/** SERVER ONLY: pass the result to client islands. */
export function labelCups(cups: readonly Cup[]): LabeledCup[] {
  return cups.map((cup) => ({
    cup,
    date: formatCupDate(cup.startsAt),
    time: formatCetTime(cup.startsAt),
  }));
}

/** CLIENT ONLY: visitor zone, e.g. { time: "13:00", zone: "GMT-5" } */
export function formatLocalTime(iso: string): { time: string; zone: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZoneName: "shortOffset",
  }).formatToParts(new Date(iso));
  return { time: `${part(parts, "hour")}:${part(parts, "minute")}`, zone: part(parts, "timeZoneName") };
}

function clock(iso: string, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
}

/** CLIENT ONLY: true when the visitor's HH:mm equals the cup zone's HH:mm. */
export function sameClockAsCupZone(iso: string): boolean {
  return clock(iso) === clock(iso, CUP_TIMEZONE);
}

/** "29d 04h 12m 09s". Zero or negative gives "0d 00h 00m 00s". */
export function formatCountdown(ms: number): string {
  const total = ms > 0 ? Math.floor(ms / 1000) : 0;
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d}d ${p(h)}h ${p(m)}m ${p(s)}s`;
}
