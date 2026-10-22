import { TextLink } from "@/components/ui";
import { Th } from "@/components/season/Th";
import { formatEurDelta, formatLedgerDate, formatUsdApprox } from "@/components/season/format";
import { cupPath } from "@/config/routes";
import type { LedgerEntry, LedgerKind } from "@/data/ledger";

const KIND_LABEL: Record<LedgerKind, string> = {
  prize: "Prize",
  sponsor: "Sponsor",
  "other-income": "Other income",
};

function amountOf(e: LedgerEntry): string {
  return formatEurDelta(e.amountEur, e.kind === "prize" ? "out" : "in");
}

export function EntriesTable({
  entries,
  knownCups,
}: {
  entries: readonly LedgerEntry[];
  knownCups: ReadonlySet<number>;
}) {
  const cupCell = (e: LedgerEntry) => {
    if (e.cup === undefined) return "–";
    return knownCups.has(e.cup) ? <TextLink href={cupPath(e.cup)}>{`#${e.cup}`}</TextLink> : `#${e.cup}`;
  };
  return (
    <>
      <div className="hidden overflow-x-auto rounded-lg border border-line sm:block">
        <table className="w-full text-left">
          <caption className="sr-only">Prizes paid and money received, newest first</caption>
          <thead className="bg-panel text-sm text-muted">
            <tr>
              <Th className="pl-4 sm:pl-5">Date</Th>
              <Th>Type</Th>
              <Th>Party</Th>
              <Th>Cup</Th>
              <Th align="right" className="pr-4 sm:pr-5">Amount</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {entries.map((e) => (
              <tr key={e.id}>
                <td className="whitespace-nowrap py-4 pr-2 pl-4 align-top tabular-nums sm:pl-5">
                  <time dateTime={e.date}>{formatLedgerDate(e.date)}</time>
                </td>
                <td className="px-2 py-4 align-top text-sm text-muted">{KIND_LABEL[e.kind]}</td>
                <td className="px-2 py-4 align-top">
                  {e.party}
                  {e.note ? <span className="block text-sm text-muted">{e.note}</span> : null}
                </td>
                <td className="px-2 py-4 align-top tabular-nums">{cupCell(e)}</td>
                <td className="whitespace-nowrap py-4 pr-4 pl-2 text-right align-top tabular-nums sm:pr-5">
                  {amountOf(e)}
                  <span className="block text-sm text-muted">{formatUsdApprox(e.amountEur)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="divide-y divide-line border-y border-line sm:hidden">
        {entries.map((e) => (
          <li key={e.id} className="py-4">
            <p className="flex justify-between gap-4 text-sm text-muted tabular-nums">
              <span>
                <time dateTime={e.date}>{formatLedgerDate(e.date)}</time>
                {` · ${e.cup === undefined ? "No cup" : `Cup #${e.cup}`} · ${KIND_LABEL[e.kind]}`}
              </span>
            </p>
            <p className="mt-1 flex items-baseline justify-between gap-4">
              <span>{e.party}</span>
              <span className="shrink-0 text-right tabular-nums">
                {amountOf(e)}
                <span className="block text-sm text-muted">{formatUsdApprox(e.amountEur)}</span>
              </span>
            </p>
            {e.note ? <p className="mt-1 text-sm text-muted">{e.note}</p> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
