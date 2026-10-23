import { ROUTES, absoluteUrl, cupPath } from "@/config/routes";
import { site } from "@/config/site";
import { CUPS_UPDATED_AT, cups, type Cup } from "@/data/cups";
import { formatCetTime, formatCupDate } from "@/lib/time";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function item(cup: Cup): string {
  const link = absoluteUrl(cupPath(cup.number));
  const date = formatCupDate(cup.startsAt);
  const title = `${cup.title}: ${date}, level ${cup.level}`;
  const description = `${cup.title} is a level ${cup.level} duel cup on ${date} at ${formatCetTime(cup.startsAt)}. Free entry, ${cup.slots} players, EUR ${cup.prizeEur} prize.`;
  return [
    "    <item>",
    `      <title>${escapeXml(title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `      <pubDate>${new Date(cup.announcedAt).toUTCString()}</pubDate>`,
    `      <description>${escapeXml(description)}</description>`,
    "    </item>",
  ].join("\n");
}

export function GET() {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Fair Ping cups</title>",
    `    <link>${escapeXml(site.url)}</link>`,
    "    <description>Dates, levels and prizes for every Fair Ping cup.</description>",
    "    <language>en</language>",
    `    <lastBuildDate>${new Date(CUPS_UPDATED_AT).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(absoluteUrl(ROUTES.feed))}" rel="self" type="application/rss+xml" />`,
    ...cups.map(item),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
