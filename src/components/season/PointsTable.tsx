import { FactGrid } from "@/components/ui";
import { PLACE_LABEL, PLACE_POINTS } from "@/lib/points";
import type { Place } from "@/data/cups";

const PLACES: readonly Place[] = [1, 2, 3, 5];

export function PointsTable() {
  return (
    <>
      <FactGrid
        items={PLACES.map((place) => ({
          label: PLACE_LABEL[place],
          value: `${PLACE_POINTS[place]} ${PLACE_POINTS[place] === 1 ? "point" : "points"}`,
        }))}
      />
      <p className="mt-6 max-w-xl text-sm text-muted text-pretty">
        Points add up across cups. Players on equal points share a rank, and the order within a rank goes by wins, then best finish, then name.
      </p>
    </>
  );
}
