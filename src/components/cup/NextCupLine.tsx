"use client";

import { CupCountdown } from "@/components/cup/CupCountdown";
import { CupStatusBadge } from "@/components/cup/CupStatusBadge";
import { LocalTime } from "@/components/cup/LocalTime";
import { ButtonLink, Heading, Section, TextLink } from "@/components/ui";
import { cupPath } from "@/config/routes";
import { site } from "@/config/site";
import { getCupStatus, getNextCup, type LabeledCup } from "@/lib/time";
import { useNow } from "@/lib/useNow";

const NONE_COPY = "No cup scheduled. New dates go out on Discord first.";

export function NextCupLine({
  items,
  variant = "line",
}: {
  items: readonly LabeledCup[];
  variant?: "line" | "card" | "detail";
}) {
  const now = useNow();
  const next = getNextCup(
    items.map((i) => i.cup),
    now,
  );
  const item = next ? items.find((i) => i.cup === next) : undefined;
  const status = next ? getCupStatus(next, now) : undefined;

  if (!next || !item || !status) {
    if (variant === "detail") return null;
    if (variant === "card") {
      return (
        <article className="rounded-lg border border-line bg-panel p-5 sm:p-8">
          <p>{NONE_COPY}</p>
          <p className="mt-3 text-sm">
            <TextLink href={site.discord}>Discord</TextLink>
          </p>
        </article>
      );
    }
    return (
      <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
        <span className="text-muted">{NONE_COPY}</span>
        <TextLink href={site.discord}>Discord</TextLink>
      </p>
    );
  }

  const { cup, date, time } = item;
  const bracket = cup.bracketUrl ?? site.challengermode;

  if (variant === "line") {
    if (status === "live") {
      return (
        <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm tabular-nums">
          <CupStatusBadge cup={cup} />
          <span>{cup.title}</span>
          <TextLink href={site.twitch}>Watch on Twitch</TextLink>
        </p>
      );
    }
    return (
      <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm tabular-nums">
        <span className="text-accent">Next cup</span>
        <TextLink href={cupPath(cup.number)}>{`${cup.title} · ${date} · ${time}`}</TextLink>
        <LocalTime startsAt={cup.startsAt} />
        <span className="text-muted">{`Level ${cup.level}`}</span>
        <CupCountdown startsAt={cup.startsAt} size="sm" />
      </p>
    );
  }

  if (variant === "card") {
    const live = status === "live";
    return (
      <article aria-labelledby="next-cup-h" className="rounded-lg border border-line bg-panel p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <CupStatusBadge cup={cup} />
          <Heading as="h2" size="base" id="next-cup-h">
            {`${cup.title} · Level ${cup.level}`}
          </Heading>
        </div>
        <p className="mt-5">
          <time dateTime={cup.startsAt} className="tabular-nums">{`${date} · ${time}`}</time>
        </p>
        <span className="mt-1 block min-h-5 text-sm text-muted">
          <LocalTime startsAt={cup.startsAt} />
        </span>
        <div className="mt-8">
          {live ? (
            <p className="font-display text-display leading-none uppercase">Live now</p>
          ) : (
            <CupCountdown startsAt={cup.startsAt} size="lg" />
          )}
        </div>
        <p className="mt-8 text-sm text-muted tabular-nums">
          {`${cup.slots} slots · €${cup.prizeEur} prize · ${cup.faction}, ${cup.realm ?? "EU realm"}`}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {live ? (
            <>
              <ButtonLink href={site.twitch}>Watch on Twitch</ButtonLink>
              <ButtonLink href={bracket} variant="secondary">
                Open the bracket
              </ButtonLink>
            </>
          ) : (
            <ButtonLink href={bracket}>Sign up on Challengermode</ButtonLink>
          )}
          <span className="px-2 text-sm">
            <TextLink href={cupPath(cup.number)} className="inline-flex min-h-11 items-center">
              Cup details
            </TextLink>
          </span>
        </div>
      </article>
    );
  }

  // detail
  if (status === "live") {
    return (
      <Section tight eyebrow="Live now">
        <p className="font-display text-display leading-none uppercase">Live now</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={site.twitch}>Watch on Twitch</ButtonLink>
          <ButtonLink href={bracket} variant="secondary">
            Open the bracket
          </ButtonLink>
        </div>
      </Section>
    );
  }
  return (
    <Section tight eyebrow="Starts in">
      <p>
        <time dateTime={cup.startsAt} className="tabular-nums">{`${date} · ${time}`}</time>
      </p>
      <span className="mt-1 block min-h-5 text-sm text-muted">
        <LocalTime startsAt={cup.startsAt} />
      </span>
      <div className="mt-8">
        <CupCountdown startsAt={cup.startsAt} size="lg" />
      </div>
    </Section>
  );
}
