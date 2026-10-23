import type { Metadata } from "next";
import { pageUrl } from "@/lib/meta";
import { ROUTES } from "@/config/routes";
import { CupResultBlock } from "@/components/season/CupResultBlock";
import { LeaderboardTable } from "@/components/season/LeaderboardTable";
import { PointsTable } from "@/components/season/PointsTable";
import { PageHeader, Section } from "@/components/ui";
import { cups } from "@/data/cups";
import { getLeaderboard } from "@/lib/points";
import { labelCups } from "@/lib/time";

export const metadata: Metadata = {
  ...pageUrl(ROUTES.results),
  title: "Season results",
  description:
    "The Fair Ping season leaderboard, with placements, points and VODs for every cup that has been played.",
};

export default function ResultsPage() {
  const rows = getLeaderboard(cups);
  const labeled = labelCups(cups);
  const done = labeled.filter(({ cup }) => (cup.results?.length ?? 0) > 0);
  const nextCup = labeled.find(({ cup }) => (cup.results?.length ?? 0) === 0);

  // Latest class seen for each player, so the board can show it under the name.
  const classes: Record<string, string> = {};
  for (const cup of cups) {
    for (const r of cup.results ?? []) if (r.wowClass) classes[r.player] = r.wowClass;
  }

  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Season 1"
        title="Season results"
        lede="Points from every Fair Ping cup this season. Players on equal points share a rank."
      />

      <Section tight eyebrow="Leaderboard">
        <LeaderboardTable rows={rows} classes={classes} nextCup={nextCup} />
      </Section>

      <Section tight eyebrow="How points work">
        <PointsTable />
      </Section>

      {done.length > 0 ? (
        <Section tight eyebrow="Cup results">
          <ul className="space-y-6">
            {[...done].reverse().map((item) => (
              <li key={item.cup.number}>
                <CupResultBlock {...item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </main>
  );
}
