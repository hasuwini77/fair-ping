import type { Metadata } from "next";
import Link from "next/link";
import { CupStatusBadge } from "@/components/cup/CupStatusBadge";
import { LocalTime } from "@/components/cup/LocalTime";
import { NextCupLine } from "@/components/cup/NextCupLine";
import { CalendarSubscribe } from "@/components/discovery/CalendarSubscribe";
import { PageHeader, Section } from "@/components/ui";
import { cupPath } from "@/config/routes";
import { cups } from "@/data/cups";
import { formatEur } from "@/lib/money";
import { labelCups } from "@/lib/time";

export const metadata: Metadata = {
  title: "Cup schedule",
  description:
    "Dates, levels and prizes for every Fair Ping cup. Each cup is free to enter, with 64 slots and a bracket on Challengermode.",
};

export default function CupsPage() {
  const items = labelCups(cups);
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Season 1 · EU realms"
        title="Cups"
        lede="Every second Sunday, 19:00 CET. Free entry, 64 slots, brackets on Challengermode."
      />
      <div className="pb-16">
        <NextCupLine items={items} variant="card" />

        {/* B4 slot */}
        <CalendarSubscribe />
      </div>

      <Section tight eyebrow="All cups">
        <ol className="divide-y divide-line border-y border-line">
          {items.map(({ cup, date, time }) => {
            const done = (cup.results?.length ?? 0) > 0;
            const tone = done ? "text-muted" : "";
            const meta = `Level ${cup.level} · ${formatEur(cup.prizeEur)}`;
            return (
              <li key={cup.number}>
                <Link
                  href={cupPath(cup.number)}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 rounded-md py-5 sm:grid-cols-[minmax(0,1fr)_10rem_auto_1.5rem]"
                >
                  <span>
                    <span className={`block font-display text-base uppercase tracking-[0.06em] ${tone}`}>
                      {cup.title}
                    </span>
                    <time dateTime={cup.startsAt} className={`mt-1 block whitespace-nowrap tabular-nums ${tone}`}>
                      {`${date} · ${time}`}
                    </time>
                    <span className="block min-h-5 text-sm text-muted">
                      <LocalTime startsAt={cup.startsAt} />
                    </span>
                    <span className="mt-1 block text-sm text-muted tabular-nums sm:hidden">{meta}</span>
                  </span>
                  <span className="hidden text-sm text-muted tabular-nums sm:block">{meta}</span>
                  <CupStatusBadge cup={cup} />
                  <span
                    aria-hidden="true"
                    className="hidden text-muted transition-colors group-hover:text-accent sm:block"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </Section>
    </main>
  );
}
