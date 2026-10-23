import type { Metadata } from "next";
import { pageUrl } from "@/lib/meta";
import { ROUTES } from "@/config/routes";
import { EntriesTable } from "@/components/season/EntriesTable";
import { Meter } from "@/components/season/Meter";
import { formatEurSigned, formatLedgerDate, formatUsdApprox } from "@/components/season/format";
import { FactGrid, PageHeader, Section, TextLink } from "@/components/ui";
import { rulePath } from "@/config/routes";
import { cups } from "@/data/cups";
import {
  FX_AS_OF,
  LICENSE_URL,
  USD_PER_EUR,
  getCapUsage,
  getLedgerTotals,
  ledger,
} from "@/data/ledger";

export const metadata: Metadata = {
  ...pageUrl(ROUTES.ledger),
  title: "Ledger",
  description:
    "Every prize Fair Ping has paid and every sponsor payment it has received, with usage against the Blizzard license caps.",
};

export default function LedgerPage() {
  const caps = getCapUsage(ledger);
  const totals = getLedgerTotals(ledger);
  const knownCups = new Set(cups.map((c) => c.number));
  const entries = [...ledger].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Open books"
        title="Ledger"
        lede="Every prize paid and every sponsor payment received. The license caps are in US dollars, so euro amounts also show an approximate dollar value."
      />

      <Section tight eyebrow="License caps">
        <ul className="space-y-6">
          <li>
            <Meter
              label={caps.perEvent.cup === null ? "Revenue per cup" : `Revenue, cup #${caps.perEvent.cup}`}
              usd={caps.perEvent.usd}
              capUsd={caps.perEvent.capUsd}
            />
          </li>
          <li>
            <Meter
              label="Revenue, last 12 months"
              detail={`${formatLedgerDate(caps.perYear.from)} – ${formatLedgerDate(caps.perYear.to)}`}
              usd={caps.perYear.usd}
              capUsd={caps.perYear.capUsd}
            />
          </li>
        </ul>
        <p className="mt-6 max-w-xl text-sm text-muted text-pretty">
          Revenue counts sponsor money and other income. Prizes paid out are not counted.
        </p>
      </Section>

      <Section tight eyebrow="Totals">
        <FactGrid
          items={[
            {
              label: "Prizes paid",
              value: (
                <>
                  {formatEurSigned(totals.prizesEur)}
                  <span className="block text-sm text-muted">{formatUsdApprox(totals.prizesEur)}</span>
                </>
              ),
            },
            {
              label: "Income",
              value: (
                <>
                  {formatEurSigned(totals.incomeEur)}
                  <span className="block text-sm text-muted">{formatUsdApprox(totals.incomeEur)}</span>
                </>
              ),
            },
            {
              label: "Balance",
              value: (
                <>
                  {formatEurSigned(totals.balanceEur)}
                  <span className="block text-sm text-muted">{formatUsdApprox(totals.balanceEur)}</span>
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section tight eyebrow="Entries">
        {entries.length === 0 ? (
          <p className="text-muted">Nothing paid or received yet.</p>
        ) : (
          <EntriesTable entries={entries} knownCups={knownCups} />
        )}
        <p className="mt-6 max-w-xl text-sm text-muted text-pretty">
          {`USD at ${USD_PER_EUR.toFixed(2)} per EUR as of ${FX_AS_OF}, approximate. `}
          <TextLink href={LICENSE_URL}>Blizzard Community Competition License</TextLink>
          {" · "}
          <TextLink href={rulePath("prizes")}>Prizes and payment</TextLink>
        </p>
      </Section>
    </main>
  );
}
