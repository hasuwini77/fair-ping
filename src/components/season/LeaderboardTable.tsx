import { ButtonLink, TextLink } from "@/components/ui";
import { Th } from "@/components/season/Th";
import { cupPath, ROUTES } from "@/config/routes";
import type { LabeledCup } from "@/lib/time";
import type { LeaderboardRow } from "@/lib/points";

export function LeaderboardTable({
  rows,
  classes,
  nextCup,
}: {
  rows: readonly LeaderboardRow[];
  classes: Readonly<Record<string, string>>;
  nextCup?: LabeledCup;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-left">
        <caption className="sr-only">Season 1 leaderboard, ranked by points</caption>
        <thead className="bg-panel text-sm text-muted">
          <tr>
            <Th className="w-14 pl-4 sm:pl-5">Rank</Th>
            <Th>Player</Th>
            <Th align="right">Points</Th>
            <Th align="right">Cups</Th>
            <Th align="right" className="pr-4 sm:pr-5">Wins</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-5 sm:p-8">
                <p className="font-display text-base uppercase tracking-[0.06em]">No results yet.</p>
                {nextCup ? (
                  <p className="mt-2 max-w-md text-sm text-muted text-pretty">
                    {"The board fills after "}
                    <TextLink href={cupPath(nextCup.cup.number)}>{nextCup.cup.title}</TextLink>
                    {`. It starts ${nextCup.date} at ${nextCup.time}.`}
                  </p>
                ) : null}
                <div className="mt-5">
                  <ButtonLink href={ROUTES.cups} variant="secondary">
                    See the cups
                  </ButtonLink>
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const wowClass = classes[row.player];
              return (
                <tr key={row.player}>
                  <td className={`w-14 py-4 pr-2 pl-4 tabular-nums sm:pl-5 ${row.rank === 1 ? "text-accent" : "text-muted"}`}>{row.rank}</td>
                  <td className="px-2 py-4">
                    <span className="block">{row.player}</span>
                    {wowClass ? <span className="block text-sm text-muted">{wowClass}</span> : null}
                  </td>
                  <td className="px-2 py-4 text-right tabular-nums">{row.points}</td>
                  <td className="px-2 py-4 text-right tabular-nums text-muted">{row.cupsPlaced}</td>
                  <td className="py-4 pr-4 pl-2 text-right tabular-nums text-muted sm:pr-5">{row.wins}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
