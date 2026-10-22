// Cup schedule and results. Zero runtime imports: this file is plain data.
// To edit it, follow "Editing cups, results and the ledger" in README.md.

/** 1 = 1st, 2 = 2nd, 3 = shared 3rd–4th (2 players), 5 = shared 5th–8th (4 players). */
export type Place = 1 | 2 | 3 | 5;
export interface Placement {
  place: Place;
  player: string;
  wowClass?: string;
}
export type Faction = "Horde" | "Alliance";
export type CupStatus = "upcoming" | "live" | "done";
export interface Caster {
  name: string;
  url?: string;
}
export interface Cup {
  /** URL segment: /cups/<number> */
  number: number;
  /** Exactly `Fair Ping Cup #${number}` */
  title: string;
  /** "2026-11-22T19:00:00+01:00" */
  startsAt: string;
  /** ISO, used as the RSS pubDate */
  announcedAt: string;
  level: number;
  slots: number;
  prizeEur: number;
  format: string;
  /** Undefined renders "Realm to be announced" */
  realm?: string;
  faction: Faction;
  /** Undefined falls back to site.challengermode */
  bracketUrl?: string;
  vodUrl?: string;
  /** Undefined renders "Caster to be announced" */
  caster?: Caster;
  /** Non-empty means done regardless of the clock. Up to 8 entries. */
  results?: readonly Placement[];
}

/** ICS DTSTAMP, sitemap lastmod, RSS lastBuildDate. Bump it on every data edit. */
export const CUPS_UPDATED_AT = "2026-10-23T12:00:00+02:00";

const FORMAT = "1v1, single elimination, best of 3, final best of 5";

// Never empty: an empty generateStaticParams is a build error under cacheComponents.
export const cups: readonly Cup[] = [
  {
    number: 1,
    title: "Fair Ping Cup #1",
    startsAt: "2026-11-22T19:00:00+01:00",
    announcedAt: CUPS_UPDATED_AT,
    level: 30,
    slots: 64,
    prizeEur: 50,
    format: FORMAT,
    faction: "Horde",
  },
  {
    number: 2,
    title: "Fair Ping Cup #2",
    startsAt: "2026-12-06T19:00:00+01:00",
    announcedAt: CUPS_UPDATED_AT,
    level: 60,
    slots: 64,
    prizeEur: 50,
    format: FORMAT,
    faction: "Horde",
  },
  {
    number: 3,
    title: "Fair Ping Cup #3",
    startsAt: "2026-12-20T19:00:00+01:00",
    announcedAt: CUPS_UPDATED_AT,
    level: 60,
    slots: 64,
    prizeEur: 50,
    format: FORMAT,
    faction: "Horde",
  },
];

export function getCup(n: number | string): Cup | undefined {
  const num = Number(n);
  return cups.find((c) => c.number === num);
}
