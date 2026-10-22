const eur = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** "€50". Server use. */
export function formatEur(n: number): string {
  return eur.format(n);
}

/** "$25,000". Server use. */
export function formatUsd(n: number): string {
  return usd.format(n);
}
