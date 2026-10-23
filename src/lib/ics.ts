import { absoluteUrl, cupPath } from "@/config/routes";
import { site } from "@/config/site";
import { CUPS_UPDATED_AT, type Cup } from "@/data/cups";
import { cupEndMs } from "@/lib/time";

const CRLF = "\r\n";
const FOLD_OCTETS = 75;
const BLIZZARD_NOTE = "Not endorsed by Blizzard Entertainment.";

/** "2026-11-22T19:00:00+01:00" becomes "20261122T180000Z". */
export function toIcsUtc(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function utcFromMs(ms: number): string {
  return toIcsUtc(new Date(ms).toISOString());
}

/** RFC 5545 TEXT escaping. */
function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Fold a content line at 75 octets without splitting a character. */
function fold(line: string): string {
  const encoder = new TextEncoder();
  const lines: string[] = [];
  let current = "";
  let octets = 0;
  for (const ch of line) {
    const size = encoder.encode(ch).length;
    // Continuation lines start with one space, so they carry one octet less.
    const limit = lines.length === 0 ? FOLD_OCTETS : FOLD_OCTETS - 1;
    if (octets + size > limit) {
      lines.push(current);
      current = "";
      octets = 0;
    }
    current += ch;
    octets += size;
  }
  lines.push(current);
  return lines.join(CRLF + " ");
}

function signupUrl(cup: Cup): string {
  return cup.bracketUrl ?? site.challengermode;
}

function describe(cup: Cup): string {
  return `Level ${cup.level} duel cup. ${cup.slots} slots, EUR ${cup.prizeEur} prize, free entry. Sign up: ${signupUrl(cup)} ${BLIZZARD_NOTE}`;
}

function locationOf(cup: Cup): string {
  return cup.realm ? `${cup.realm}, ${cup.faction}` : "EU realm, announced on Discord";
}

function vevent(cup: Cup): string[] {
  return [
    "BEGIN:VEVENT",
    `UID:fairping-cup-${cup.number}@${new URL(site.url).host}`,
    `DTSTAMP:${toIcsUtc(CUPS_UPDATED_AT)}`,
    `DTSTART:${toIcsUtc(cup.startsAt)}`,
    `DTEND:${utcFromMs(cupEndMs(cup))}`,
    `SUMMARY:${escapeText(cup.title)}`,
    `DESCRIPTION:${escapeText(describe(cup))}`,
    `LOCATION:${escapeText(locationOf(cup))}`,
    `URL:${absoluteUrl(cupPath(cup.number))}`,
    "END:VEVENT",
  ];
}

export function buildCalendar(cups: readonly Cup[], opts: { name: string; feed: boolean }): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fair Ping//Cups//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(opts.name)}`,
    ...(opts.feed ? ["REFRESH-INTERVAL;VALUE=DURATION:PT12H", "X-PUBLISHED-TTL:PT12H"] : []),
    ...cups.flatMap(vevent),
    "END:VCALENDAR",
  ];
  return lines.map(fold).join(CRLF) + CRLF;
}

/** Google Calendar "create event" link for one cup. */
export function googleCalendarUrl(cup: Cup): string {
  const dates = `${toIcsUtc(cup.startsAt)}/${utcFromMs(cupEndMs(cup))}`;
  const details = `${describe(cup)} ${absoluteUrl(cupPath(cup.number))}`;
  const query = [
    "action=TEMPLATE",
    `text=${encodeURIComponent(cup.title)}`,
    `dates=${dates}`,
    `details=${encodeURIComponent(details)}`,
    `location=${encodeURIComponent(locationOf(cup))}`,
  ].join("&");
  return `https://calendar.google.com/calendar/render?${query}`;
}
