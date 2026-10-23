import type { Metadata } from "next";
import { ButtonLink, PageHeader, Section, TextLink } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { site } from "@/config/site";
import { LICENSE_CAPS, LICENSE_URL } from "@/data/ledger";
import { sponsorExclusions, sponsorTiers } from "@/data/sponsors";
import { formatEur, formatUsd } from "@/lib/money";

export const metadata: Metadata = {
  title: "Sponsor a cup",
  description:
    "Prizes come from us and from sponsors. See the three tiers, what a sponsor gets, the rules that come with the Blizzard license and how to get in touch.",
};

const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

const rules = [
  { text: `Up to ${formatUsd(LICENSE_CAPS.perSponsorUsd)} per sponsor.` },
  { text: `All sponsors together stay under ${formatUsd(LICENSE_CAPS.allSponsorsPerEventUsd)} per cup.` },
  {
    text: "No sponsors from these categories.",
    detail: `${sponsorExclusions.join("; ")}.`,
  },
  { text: "Multinational consumer brands and video-game-industry products need Blizzard's approval." },
  { text: "Entry stays free.", detail: "Players never pay to sign up." },
  { text: "Every euro shows on the ledger.", link: true },
];

export default function SponsorsPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Sponsors"
        title="Put your name on a cup."
        lede={
          <>
            Entry stays free. Prizes come from us and from sponsors, and every payment shows up on the{" "}
            <TextLink href={ROUTES.ledger}>ledger</TextLink>.
          </>
        }
      />

      <Section tight eyebrow="Ways in">
        <ul className="grid gap-4 md:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <li key={tier.id} className="flex">
              <article
                data-tier={tier.id}
                className="flex w-full flex-col rounded-lg border border-line bg-panel p-5"
              >
                <h3 className="font-display text-base uppercase tracking-[0.06em]">{tier.name}</h3>
                <p className="mt-3 text-sm text-muted text-pretty">{tier.summary}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <span aria-hidden="true" className="text-muted">
                        –
                      </span>
                      <span className="text-pretty">{perk}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-accent tabular-nums">
                  {formatEur(tier.priceEur)} {tier.unit}
                </p>
                <div className="mt-4">
                  <ButtonLink href={mailto(`Sponsoring Fair Ping Cup: ${tier.name}`)} variant="secondary">
                    Ask about {tier.name}
                  </ButtonLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section tight eyebrow="The rules">
        <ol className="divide-y divide-line border-y border-line">
          {rules.map((rule, i) => (
            <li key={rule.text} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-5">
              <span className="font-display text-base text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-pretty">{rule.text}</p>
                {rule.detail ? <p className="mt-2 text-sm text-muted text-pretty">{rule.detail}</p> : null}
                {rule.link ? (
                  <p className="mt-2 text-sm">
                    <TextLink href={ROUTES.ledger}>Open the ledger</TextLink>
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm">
          <TextLink href={LICENSE_URL}>Read the Blizzard Community Competition License</TextLink>
        </p>
      </Section>

      <Section tight eyebrow="Get in touch">
        <p className="max-w-xl text-muted text-pretty">Tell us your brand and a rough amount.</p>
        <div className="mt-8">
          <ButtonLink href={mailto("Sponsoring Fair Ping Cup")}>Email us about sponsoring</ButtonLink>
        </div>
        <p className="mt-4 text-sm text-muted">{site.email}</p>
      </Section>
    </main>
  );
}
