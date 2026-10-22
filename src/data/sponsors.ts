// Sponsor tiers and the exclusion list for /sponsors. Plain data, no imports.

export interface SponsorTier {
  id: "supporter" | "cup-partner" | "season-partner";
  name: string;
  summary: string;
  perks: readonly string[];
  priceEur: number;
  /** Reads after the price: "€50 per cup". */
  unit: string;
}

export const sponsorTiers: readonly SponsorTier[] = [
  {
    id: "supporter",
    name: "Supporter",
    summary: "Tops up the prize pool.",
    perks: [
      "Your name and link on the cup page and the Challengermode bracket",
      "A line in the ledger",
    ],
    priceEur: 50,
    unit: "per cup",
  },
  {
    id: "cup-partner",
    name: "Cup partner",
    summary: "Your brand on the cup.",
    perks: [
      "Fair Ping Cup #N presented by your brand, on the cup page, the bracket and the stream title",
      "Your logo on stream and on the bracket",
      "A shout-out each round",
      "An optional discount code for players",
    ],
    priceEur: 150,
    unit: "per cup",
  },
  {
    id: "season-partner",
    name: "Season partner",
    summary: "Cup partner for three cups in a row.",
    perks: [
      "Every Cup partner perk, for three cups",
      "First refusal on the next season",
    ],
    priceEur: 400,
    unit: "for three cups",
  },
];

export const sponsorExclusions: readonly string[] = [
  "gambling and casinos, including raffles and fantasy betting",
  "alcohol",
  "tobacco and vaping",
  "cannabis and drugs",
  "cryptocurrencies and NFTs",
  "AI and machine learning",
  "firearms",
  "political or religious groups",
  "account selling or sharing",
  "adult content",
  "illegal goods",
  "Blizzard competitors",
];
