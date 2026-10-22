import { toUsd } from "@/data/ledger";
import { formatEur, formatUsd } from "@/lib/money";

const ledgerDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-11-22" to "22 Nov 2026". Server use. */
export function formatLedgerDate(ymd: string): string {
  return ledgerDate.format(new Date(`${ymd}T00:00:00Z`));
}

/** Euro with a real U+2212 minus for negatives: "−€50". */
export function formatEurSigned(n: number): string {
  return n < 0 ? `−${formatEur(Math.abs(n))}` : formatEur(n);
}

/** "+€200" or "−€50". */
export function formatEurDelta(n: number, direction: "in" | "out"): string {
  return `${direction === "in" ? "+" : "−"}${formatEur(Math.abs(n))}`;
}

/** "≈ $58", with a real U+2212 minus for negatives. Server use. */
export function formatUsdApprox(eur: number): string {
  const usd = toUsd(Math.abs(eur));
  return `≈ ${eur < 0 ? "−" : ""}${formatUsd(usd)}`;
}
