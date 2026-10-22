"use client";

import { cupStartMs, formatCountdown } from "@/lib/time";
import { useNow } from "@/lib/useNow";

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** Refreshes once a minute because it only reads whole minutes. Never aria-live. */
function spokenSentence(ms: number): string {
  const totalMin = Math.floor(ms / 60_000);
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const minutes = totalMin % 60;
  if (days > 0) return `Starts in ${plural(days, "day")}, ${plural(hours, "hour")}.`;
  if (hours > 0) return `Starts in ${plural(hours, "hour")}, ${plural(minutes, "minute")}.`;
  if (minutes > 0) return `Starts in ${plural(minutes, "minute")}.`;
  return "Starts in less than a minute.";
}

const PLACEHOLDER_SM = "00d 00h 00m 00s";

function Digits({ value }: { value: string }) {
  return (
    <>
      {value.split("").map((ch, i) => (
        <span key={i} className="inline-block w-[1ch] text-center">
          {ch}
        </span>
      ))}
    </>
  );
}

export function CupCountdown({ startsAt, size = "sm" }: { startsAt: string; size?: "sm" | "lg" }) {
  const now = useNow();
  const start = cupStartMs({ startsAt });
  if (now !== null && now >= start) return null;
  const ms = now === null ? null : start - now;

  if (size === "sm") {
    return (
      <>
        <span
          aria-hidden="true"
          className={ms === null ? "invisible tabular-nums text-muted" : "tabular-nums text-muted"}
        >
          {ms === null ? PLACEHOLDER_SM : formatCountdown(ms)}
        </span>
        {ms === null ? null : <span className="sr-only">{spokenSentence(ms)}</span>}
      </>
    );
  }

  const [d, h, m, s] = ms === null ? ["--", "--", "--", "--"] : formatCountdown(ms).split(" ").map((p) => p.slice(0, -1));
  const units = [
    { label: "days", value: d },
    { label: "hours", value: h },
    { label: "minutes", value: m },
    { label: "seconds", value: s },
  ];
  return (
    <div>
      <div aria-hidden="true" className="flex gap-6 sm:gap-10">
        {units.map((u) => (
          <div key={u.label}>
            <span className="block font-display text-display leading-none tabular-nums">
              <Digits value={u.value} />
            </span>
            <span className="mt-2 block text-sm text-muted">{u.label}</span>
          </div>
        ))}
      </div>
      {ms === null ? null : <p className="sr-only">{spokenSentence(ms)}</p>}
    </div>
  );
}
