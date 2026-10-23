// Press kit data for /press: logo tiles, brand rules and copy snippets.
import { site, licenseLine } from "@/config/site";

export interface LogoFile {
  file: string;
  /** Link text, e.g. "SVG" or "PNG". */
  label: string;
  /** Screen-reader suffix, e.g. "of the dark lockup". */
  sr: string;
}

export interface LogoTile {
  id: string;
  title: string;
  /** File used for the preview. */
  preview: string;
  width: number;
  height: number;
  alt: string;
  /** Tile background token class; lockups carry their own background. */
  bg: "bg-ink" | "bg-paper" | "bg-panel";
  /** "contain-pad" gives a mark breathing room; "contain" fills the tile. */
  fit: "pad" | "full";
  files: readonly LogoFile[];
}

export const logoTiles: readonly LogoTile[] = [
  {
    id: "lockup-dark",
    title: "Lockup, dark",
    preview: "lockup-dark.svg",
    width: 520,
    height: 128,
    alt: "Fair Ping mark and wordmark on an ink background",
    bg: "bg-ink",
    fit: "full",
    files: [
      { file: "lockup-dark.svg", label: "SVG", sr: "of the dark lockup" },
      { file: "lockup-dark.png", label: "PNG", sr: "of the dark lockup" },
    ],
  },
  {
    id: "lockup-light",
    title: "Lockup, light",
    preview: "lockup-light.svg",
    width: 520,
    height: 128,
    alt: "Fair Ping mark and wordmark on a paper background",
    bg: "bg-paper",
    fit: "full",
    files: [
      { file: "lockup-light.svg", label: "SVG", sr: "of the light lockup" },
      { file: "lockup-light.png", label: "PNG", sr: "of the light lockup" },
    ],
  },
  {
    id: "mark",
    title: "Mark, green",
    preview: "mark.svg",
    width: 64,
    height: 64,
    alt: "Three green blades on an ink background",
    bg: "bg-ink",
    fit: "pad",
    files: [{ file: "mark.svg", label: "SVG", sr: "of the green mark" }],
  },
  {
    id: "mark-mono",
    title: "Mark, ink",
    preview: "mark-mono.svg",
    width: 64,
    height: 64,
    alt: "Three ink blades on a paper background",
    bg: "bg-paper",
    fit: "pad",
    files: [{ file: "mark-mono.svg", label: "SVG", sr: "of the ink mark" }],
  },
  {
    id: "avatar",
    title: "Avatar",
    preview: "avatar-400.png",
    width: 400,
    height: 400,
    alt: "Fair Ping avatar",
    bg: "bg-panel",
    fit: "pad",
    files: [
      { file: "avatar-400.png", label: "400 px", sr: "avatar" },
      { file: "avatar-1024.png", label: "1024 px", sr: "avatar" },
    ],
  },
  {
    id: "og",
    title: "Link preview, 1200 by 630",
    preview: "og-1200x630.png",
    width: 1200,
    height: 630,
    alt: "Fair Ping link preview image",
    bg: "bg-panel",
    fit: "full",
    files: [{ file: "og-1200x630.png", label: "PNG", sr: "of the link preview" }],
  },
  {
    id: "x-header",
    title: "X header, 1500 by 500",
    preview: "x-header-1500x500.png",
    width: 1500,
    height: 500,
    alt: "Fair Ping header image for X and Twitch",
    bg: "bg-panel",
    fit: "full",
    files: [{ file: "x-header-1500x500.png", label: "PNG", sr: "of the X header" }],
  },
  {
    id: "banner-plain",
    title: "Plain banner, 1500 by 375",
    preview: "banner-plain-1500x375.png",
    width: 1500,
    height: 375,
    alt: "Fair Ping banner without text",
    bg: "bg-panel",
    fit: "full",
    files: [{ file: "banner-plain-1500x375.png", label: "PNG", sr: "of the plain banner" }],
  },
];

export const brandZip = "fair-ping-brand.zip";

export const brandRules: readonly string[] = [
  "Green on ink, or ink on paper. Nothing else.",
  "No gradients or shadows.",
  "Minimum size 16 px.",
  "Clear space of one blade width on every side.",
  "Never place it next to the WoW or Blizzard logos.",
];

export interface Snippet {
  id: "boilerplate" | "announcement" | "caster" | "community";
  title: string;
  text: string;
}

export const snippets: readonly Snippet[] = [
  {
    id: "boilerplate",
    title: "Boilerplate",
    text: `Fair Ping runs free-entry 1v1 duel cups for WoW Forever on EU realms, every second Sunday at 19:00 CET. Cash prizes for players 18+. Runs under Blizzard's Community Competition License. ${licenseLine}`,
  },
  {
    id: "announcement",
    title: "Announcement",
    text: `The Forever Open ran on the US beta, and dueling from Europe at 150 ms was no fun. EU realms are up now, so we are running a free duel cup there.

Format: 1v1, level 30, Horde on an EU realm, announced on Discord. Single elimination, 64 slots, best of 3, best of 5 for the final.
Entry: free. Prize: 50 EUR to the winner (18+ for the cash prize).
When: Sunday 22 November 2026, 19:00 CET.
Sign up: ${site.challengermode}
Stream: ${site.twitch}

If it fills, it runs every second Sunday and moves to level 60 in December. Feedback on the format is welcome. We would also like to hear which classes you expect to be broken at level 30.

Not endorsed by Blizzard Entertainment.`,
  },
  {
    id: "caster",
    title: "Caster",
    text: `Title: Fair Ping Cup #1 | Level 30 | Free 1v1 duels on an EU realm

Description: 64 players, single elimination, best of 3 with a best of 5 final. Entry is free and the winner gets 50 EUR. Bracket and sign-up: ${site.challengermode}`,
  },
  {
    id: "community",
    title: "Community",
    text: `Fair Ping Cup #1 is on Sunday 22 November at 19:00 CET. Level 30, Horde, 64 slots, free entry, 50 EUR for the winner. Sign up on Challengermode: ${site.challengermode}
Cup details and rules: ${site.url}/cups
Not endorsed by Blizzard Entertainment.`,
  },
];
