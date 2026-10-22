import { FactGrid, TextLink } from "@/components/ui";
import { formatEur } from "@/lib/money";
import type { LabeledCup } from "@/lib/time";

export function CupFacts({ cup, date, time }: LabeledCup) {
  const caster = cup.caster
    ? cup.caster.url
      ? <TextLink href={cup.caster.url}>{cup.caster.name}</TextLink>
      : cup.caster.name
    : "Caster to be announced";
  return (
    <FactGrid
      items={[
        { label: "Date", value: date },
        { label: "Start", value: time },
        { label: "Level", value: `Level ${cup.level}` },
        { label: "Slots", value: `${cup.slots} players` },
        { label: "Prize", value: formatEur(cup.prizeEur) },
        { label: "Format", value: cup.format },
        { label: "Realm", value: `${cup.realm ?? "Realm to be announced"} · ${cup.faction}` },
        { label: "Caster", value: caster },
      ]}
    />
  );
}
