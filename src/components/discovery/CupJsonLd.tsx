import { absoluteUrl, cupPath } from "@/config/routes";
import { site } from "@/config/site";
import type { Cup } from "@/data/cups";
import { formatEur } from "@/lib/money";
import { cupEndMs, formatCetTime, formatCupDate } from "@/lib/time";

/** schema.org SportsEvent for one cup. Server component, no clock. */
export function CupJsonLd({ cup }: { cup: Cup }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: cup.title,
    description: `${cup.title} is a level ${cup.level} duel cup on ${formatCupDate(cup.startsAt)} at ${formatCetTime(cup.startsAt)}. Free entry, ${cup.slots} players, ${formatEur(cup.prizeEur)} prize.`,
    startDate: cup.startsAt,
    endDate: new Date(cupEndMs(cup)).toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: cup.bracketUrl ?? site.challengermode },
    organizer: { "@type": "Organization", name: "Fair Ping", url: site.url },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(cupPath(cup.number)),
      validFrom: cup.announcedAt,
    },
    image: absoluteUrl(`/cups/${cup.number}/opengraph-image`),
    sport: "World of Warcraft duels",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
