import type { Cup, Place, Placement } from "@/data/cups";

export const PLACE_POINTS: Readonly<Record<Place, number>> = { 1: 10, 2: 6, 3: 3, 5: 1 };
export const PLACE_LABEL: Readonly<Record<Place, string>> = {
  1: "1st",
  2: "2nd",
  3: "3rd–4th",
  5: "5th–8th",
};

export interface LeaderboardRow {
  rank: number;
  player: string;
  points: number;
  cupsPlaced: number;
  wins: number;
  bestPlace: Place;
}

export function pointsFor(place: Place): number {
  return PLACE_POINTS[place];
}

export function getLeaderboard(cups: readonly Pick<Cup, "results">[]): LeaderboardRow[] {
  const rows = new Map<string, Omit<LeaderboardRow, "rank">>();
  for (const cup of cups) {
    const seen = new Set<string>();
    for (const r of cup.results ?? []) {
      const row = rows.get(r.player) ?? {
        player: r.player,
        points: 0,
        cupsPlaced: 0,
        wins: 0,
        bestPlace: r.place,
      };
      row.points += pointsFor(r.place);
      if (!seen.has(r.player)) {
        row.cupsPlaced += 1;
        seen.add(r.player);
      }
      if (r.place === 1) row.wins += 1;
      if (r.place < row.bestPlace) row.bestPlace = r.place;
      rows.set(r.player, row);
    }
  }
  const sorted = [...rows.values()].sort(
    (a, b) =>
      b.points - a.points ||
      b.wins - a.wins ||
      a.bestPlace - b.bestPlace ||
      (a.player < b.player ? -1 : a.player > b.player ? 1 : 0),
  );
  return sorted.map((row) => ({
    rank: 1 + sorted.filter((o) => o.points > row.points).length,
    ...row,
  }));
}

/** Places 1, 2 and 3, sorted by place, data order within a place. */
export function getTopFour(cup: Pick<Cup, "results">): Placement[] {
  return (cup.results ?? []).filter((r) => r.place <= 3).sort((a, b) => a.place - b.place);
}
