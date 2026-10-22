// Prize payouts and sponsor money. Zero runtime imports: this file is plain data.
// To edit it, follow "Editing cups, results and the ledger" in README.md.

export type LedgerKind = "prize" | "sponsor" | "other-income";
export interface LedgerEntry {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  kind: LedgerKind;
  cup?: number;
  party: string;
  amountEur: number;
  note?: string;
}

export const LICENSE_URL =
  "https://www.blizzard.com/en-us/legal/ad996a79-1b76-47af-a586-833c8af93a3d/blizzard-community-competition-license";
export const LICENSE_CAPS = {
  perEventUsd: 25_000,
  perYearUsd: 100_000,
  perSponsorUsd: 10_000,
  allSponsorsPerEventUsd: 25_000,
} as const;

/** Fixed conversion rate used for every cap meter. Update it together with FX_AS_OF. */
export const USD_PER_EUR = 1.15;
export const FX_AS_OF = "2026-10-23";
export const LEDGER_UPDATED_AT = "2026-10-23";

export const ledger: readonly LedgerEntry[] = [];

export function toUsd(eur: number): number {
  // Integer cents first so 50 × 1.15 rounds to 58, not 57 (float 57.4999…).
  return Math.round((eur * Math.round(USD_PER_EUR * 100)) / 100);
}

export interface LedgerTotals {
  prizesEur: number;
  incomeEur: number;
  balanceEur: number;
}

export function getLedgerTotals(entries: readonly LedgerEntry[]): LedgerTotals {
  let prizesEur = 0;
  let incomeEur = 0;
  for (const e of entries) {
    if (e.kind === "prize") prizesEur += e.amountEur;
    else incomeEur += e.amountEur;
  }
  return { prizesEur, incomeEur, balanceEur: incomeEur - prizesEur };
}

export interface CapUsage {
  /** Highest single-cup income */
  perEvent: { usd: number; capUsd: number; cup: number | null };
  /** Income with from < date <= to */
  perYear: { usd: number; capUsd: number; from: string; to: string };
}

const DAY_MS = 86_400_000;

export function getCapUsage(entries: readonly LedgerEntry[], asOf?: string): CapUsage {
  const income = entries.filter((e) => e.kind !== "prize");

  const byCup = new Map<number, number>();
  for (const e of income) {
    if (e.cup === undefined) continue;
    byCup.set(e.cup, (byCup.get(e.cup) ?? 0) + e.amountEur);
  }
  let topCup: number | null = null;
  let topEur = 0;
  for (const [cup, eur] of [...byCup].sort((a, b) => a[0] - b[0])) {
    if (eur > topEur) {
      topEur = eur;
      topCup = cup;
    }
  }

  let to = asOf ?? LEDGER_UPDATED_AT;
  for (const e of entries) if (e.date > to) to = e.date;
  const from = new Date(Date.parse(`${to}T00:00:00Z`) - 365 * DAY_MS).toISOString().slice(0, 10);
  const yearEur = income.filter((e) => e.date > from && e.date <= to).reduce((s, e) => s + e.amountEur, 0);

  return {
    perEvent: { usd: toUsd(topEur), capUsd: LICENSE_CAPS.perEventUsd, cup: topCup },
    perYear: { usd: toUsd(yearEur), capUsd: LICENSE_CAPS.perYearUsd, from, to },
  };
}
