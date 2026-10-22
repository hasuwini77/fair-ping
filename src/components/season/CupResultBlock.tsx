import { Heading, TextLink } from "@/components/ui";
import { cupPath } from "@/config/routes";
import type { Place } from "@/data/cups";
import { PLACE_LABEL } from "@/lib/points";
import type { LabeledCup } from "@/lib/time";

const PLACES: readonly Place[] = [1, 2, 3, 5];

export function CupResultBlock({ cup, date }: LabeledCup) {
  const results = cup.results ?? [];
  return (
    <article aria-labelledby={`cup-${cup.number}-results-h`} className="rounded-lg border border-line p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Heading as="h3" size="base" id={`cup-${cup.number}-results-h`}>
          <TextLink href={cupPath(cup.number)}>{cup.title}</TextLink>
        </Heading>
        <time dateTime={cup.startsAt} className="text-sm text-muted tabular-nums">
          {date}
        </time>
      </div>
      <dl className="mt-4 divide-y divide-line border-y border-line">
        {PLACES.map((place) => {
          const group = results.filter((r) => r.place === place);
          if (group.length === 0) return null;
          return (
            <div key={place} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 py-3">
              <dt className="text-sm text-muted tabular-nums">{PLACE_LABEL[place]}</dt>
              <dd>
                <ul>
                  {group.map((r) => (
                    <li key={r.player}>
                      {r.player}
                      {r.wowClass ? <span className="ml-3 text-sm text-muted">{r.wowClass}</span> : null}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          );
        })}
      </dl>
      {cup.vodUrl ? (
        <p className="mt-4 text-sm">
          <TextLink href={cup.vodUrl}>Watch the VOD</TextLink>
        </p>
      ) : null}
    </article>
  );
}
