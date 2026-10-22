import { site } from "@/config/site";

export const ROUTES = {
  home: "/",
  cups: "/cups",
  rules: "/rules",
  join: "/join",
  results: "/results",
  ledger: "/ledger",
  sponsors: "/sponsors",
  press: "/press",
  calendar: "/calendar.ics",
  feed: "/feed.xml",
} as const;

// ORDER FROZEN
export const NAV_LINKS = [
  { href: "/cups", label: "Cups" },
  { href: "/rules", label: "Rules" },
  { href: "/join", label: "Join" },
  { href: "/results", label: "Results" },
  { href: "/sponsors", label: "Sponsors" },
] as const;

// ORDER FROZEN. The footer also shows Discord and the contact email.
export const FOOTER_LINKS = [
  { href: "/ledger", label: "Ledger" },
  { href: "/press", label: "Press" },
  { href: "/calendar.ics", label: "Calendar" },
  { href: "/feed.xml", label: "RSS" },
] as const;

/** Sitemap source. */
export const STATIC_PAGES = ["/", "/cups", "/rules", "/join", "/results", "/ledger", "/sponsors", "/press"] as const;

// Ids and order frozen. There is no "points" section.
export const RULE_SECTIONS = [
  { id: "format", label: "Format" },
  { id: "level", label: "Level and characters" },
  { id: "eligibility", label: "Eligibility" },
  { id: "check-in", label: "Check-in" },
  { id: "reporting", label: "Reporting results" },
  { id: "no-show", label: "No-shows" },
  { id: "disputes", label: "Disputes" },
  { id: "conduct", label: "Conduct" },
  { id: "prizes", label: "Prizes and payment" },
  { id: "license", label: "License" },
] as const;
export type RuleId = (typeof RULE_SECTIONS)[number]["id"];

export const cupPath = (n: number) => `/cups/${n}`;
export const cupIcsPath = (n: number) => `/cups/${n}/invite.ics`;
export const rulePath = (id: RuleId) => `/rules#${id}`;
export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
