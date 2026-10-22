import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RuleList, RuleSection } from "@/components/content/RuleSection";
import { PageHeader, TextLink } from "@/components/ui";
import { ROUTES, RULE_SECTIONS, type RuleId } from "@/config/routes";
import { licenseLine, site } from "@/config/site";
import { cups } from "@/data/cups";
import { LICENSE_URL } from "@/data/ledger";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "Format, levels, eligibility, check-in, no-shows, disputes, conduct, prizes and license for every Fair Ping cup.",
};

const emphasis = (text: string) => <span className="text-paper">{text}</span>;

const bodies: Record<RuleId, ReactNode> = {
  format: (
    <>
      <p>
        Every cup is 1v1 duels, single elimination, {emphasis("64 players")}. Matches are{" "}
        {emphasis("best of 3")} and the final is {emphasis("best of 5")}.
      </p>
      <p>
        Cups run every second Sunday at 19:00 CET. Sign-ups and brackets are on the{" "}
        <TextLink href={site.challengermode}>Challengermode Space</TextLink>. Dates are on the{" "}
        <TextLink href={ROUTES.cups}>cup schedule</TextLink>.
      </p>
    </>
  ),
  level: (
    <>
      <p>
        You need a {emphasis("Horde")} character at the cup level, on the cup realm. The realm is announced
        on Discord and on the cup page.
      </p>
      <ul className="space-y-2 tabular-nums">
        {cups.map((cup) => (
          <li key={cup.number} className="flex gap-3">
            <span aria-hidden="true">–</span>
            <span>
              {cup.title}: level {cup.level}
            </span>
          </li>
        ))}
      </ul>
      <p>Gear, talents and consumables: Posted in #rules on Discord before the cup.</p>
    </>
  ),
  eligibility: (
    <>
      <p>Entry is free. Anyone who can play on the EU cup realm can enter.</p>
      <p>
        Cash prizes are only for players {emphasis("18+")}. Players under 18 keep their placement and
        points, and no cash is passed down.
      </p>
    </>
  ),
  "check-in": (
    <>
      <p>
        Check in on Challengermode in the {emphasis("15 minutes")} before the start. Players who are not
        checked in when the bracket starts are dropped.
      </p>
    </>
  ),
  reporting: (
    <>
      <p>
        The winner reports the score on Challengermode with a {emphasis("screenshot")} of each game&apos;s
        end.
      </p>
    </>
  ),
  "no-show": (
    <>
      <p>
        If you are not ready {emphasis("10 minutes")} after your match is called, it counts as a loss.
      </p>
    </>
  ),
  disputes: (
    <>
      <p>
        Raise a dispute on Challengermode or with the cup admin on{" "}
        <TextLink href={site.discord}>Discord</TextLink>, with screenshots. Admin decisions are final.
      </p>
    </>
  ),
  conduct: (
    <>
      <RuleList
        items={[
          "No cheats, bots or third-party automation.",
          "No exploits.",
          "No account sharing.",
          "No win-trading.",
          "Keep chat respectful.",
        ]}
      />
      <p>The cup admin may disqualify a player who breaks these rules.</p>
    </>
  ),
  prizes: (
    <>
      <p>
        The winner gets {emphasis("€50")} to start, growing with sponsors. Cash prizes are only for players
        18+.
      </p>
      <p>
        Prizes are paid via {emphasis("Wise")} within 7 days of confirmed results. Every payment shows on
        the <TextLink href={ROUTES.ledger}>ledger</TextLink>.
      </p>
    </>
  ),
  license: (
    <>
      <p>
        Fair Ping runs under Blizzard&apos;s{" "}
        <TextLink href={LICENSE_URL}>Community Competition License</TextLink>. It is not officially
        supported or endorsed by Blizzard Entertainment.
      </p>
      <p>{licenseLine}</p>
    </>
  ),
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function RulesPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Rules"
        title="Cup rules"
        lede="What applies on cup night. Anything not covered here is posted in #rules on Discord before the cup."
      />
      <div className="border-t border-line py-16 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16">
        <nav
          aria-label="On this page"
          className="mb-12 rounded-lg border border-line p-5 lg:sticky lg:top-8 lg:mb-0 lg:self-start lg:border-0 lg:p-0"
        >
          <p className="text-sm text-muted">On this page</p>
          <ol className="mt-3 grid gap-x-6 text-sm min-[420px]:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-line">
            {RULE_SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex min-h-11 items-center gap-3 text-muted transition-colors hover:text-paper lg:-ml-px lg:min-h-0 lg:border-l lg:border-transparent lg:py-2 lg:pl-4"
                >
                  <span className="tabular-nums">{pad(i + 1)}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-prose space-y-12">
          {RULE_SECTIONS.map((s, i) => (
            <RuleSection key={s.id} id={s.id} label={s.label} number={pad(i + 1)}>
              {bodies[s.id]}
            </RuleSection>
          ))}
        </div>
      </div>
    </main>
  );
}
