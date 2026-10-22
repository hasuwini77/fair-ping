import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CupFacts } from "@/components/cup/CupFacts";
import { CupStatusBadge } from "@/components/cup/CupStatusBadge";
import { NextCupLine } from "@/components/cup/NextCupLine";
import { UpcomingOnly } from "@/components/cup/UpcomingOnly";
import { ButtonLink, PageHeader, Section, TextLink } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { site } from "@/config/site";
import { cups, getCup } from "@/data/cups";
import { formatEur } from "@/lib/money";
import { PLACE_LABEL, getTopFour } from "@/lib/points";
import { formatCetTime, formatCupDate, labelCups } from "@/lib/time";

export function generateStaticParams() {
  return cups.map((c) => ({ n: String(c.number) }));
}

export async function generateMetadata({ params }: PageProps<"/cups/[n]">): Promise<Metadata> {
  const { n } = await params;
  const cup = getCup(n);
  if (!cup) return {};
  const date = formatCupDate(cup.startsAt);
  return {
    title: { absolute: `${cup.title} · ${date}` },
    description: `${cup.title} is a level ${cup.level} duel cup on ${date} at ${formatCetTime(cup.startsAt)}. Free entry, ${cup.slots} players, ${formatEur(cup.prizeEur)} prize.`,
  };
}

export default async function CupPage({ params }: PageProps<"/cups/[n]">) {
  const { n } = await params;
  const cup = getCup(n) ?? notFound();
  const [item] = labelCups([cup]);
  const top = getTopFour(cup);
  const hasResults = (cup.results?.length ?? 0) > 0;
  const bracket = cup.bracketUrl ?? site.challengermode;

  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow={`Level ${cup.level} · ${cup.realm ?? "EU realm"}`}
        title={cup.title}
        lede={
          <>
            <span className="tabular-nums">{`${item.date} at ${item.time}`}</span>
            {`. Free entry, ${cup.slots} players.`}
          </>
        }
      >
        <CupStatusBadge cup={cup} />
        {hasResults ? (
          <>
            {cup.vodUrl ? <ButtonLink href={cup.vodUrl}>Watch the VOD</ButtonLink> : null}
            <ButtonLink href={bracket} variant="secondary">
              See the bracket
            </ButtonLink>
          </>
        ) : (
          <UpcomingOnly cup={cup}>
            <ButtonLink href={bracket}>Sign up on Challengermode</ButtonLink>
          </UpcomingOnly>
        )}
      </PageHeader>

      <NextCupLine items={[item]} variant="detail" />

      <Section tight eyebrow="Cup facts">
        <CupFacts {...item} />

        {/* B4 slot */}
      </Section>

      <Section tight eyebrow="Results">
        {top.length > 0 ? (
          <>
            <ol className="divide-y divide-line border-y border-line">
              {top.map((r, i) => (
                <li
                  key={`${r.place}-${r.player}`}
                  className="grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-x-4 py-5"
                >
                  <span className={r.place === 1 ? "text-sm font-medium text-accent" : "text-sm text-muted"}>
                    {PLACE_LABEL[r.place]}
                  </span>
                  <span>
                    <span
                      className={
                        i === 0
                          ? "block font-display text-display leading-[0.92] uppercase [overflow-wrap:anywhere]"
                          : "block [overflow-wrap:anywhere]"
                      }
                    >
                      {r.player}
                    </span>
                    {r.wowClass ? <span className="mt-1 block text-sm text-muted">{r.wowClass}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
            {cup.vodUrl ? (
              <p className="mt-6 text-sm">
                <TextLink href={cup.vodUrl}>Watch the VOD</TextLink>
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-muted">Results are posted here after the cup.</p>
        )}
        <p className="mt-8 text-sm">
          <TextLink href={ROUTES.rules} className="inline-flex min-h-11 items-center">
            Read the rules
          </TextLink>
        </p>
      </Section>
    </main>
  );
}
