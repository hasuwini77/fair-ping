import type { Metadata } from "next";
import { pageUrl } from "@/lib/meta";
import type { ReactNode } from "react";
import { ButtonLink, PageHeader, Section, TextLink } from "@/components/ui";
import { ROUTES, rulePath } from "@/config/routes";
import { site } from "@/config/site";

export const metadata: Metadata = {
  ...pageUrl(ROUTES.join),
  title: "How to join",
  description:
    "Six steps to enter a Fair Ping cup: make a Challengermode account, sign up, check in, join the Discord and screenshot your games.",
};

interface Step {
  title: string;
  body: string;
  link: { href: string; label: string };
}

const steps: readonly Step[] = [
  {
    title: "Create a free Challengermode account",
    body: "Sign-ups and brackets run on Challengermode. The account is free.",
    link: { href: site.challengermode, label: "Open Challengermode" },
  },
  {
    title: "Join the Fair Ping Space",
    body: "Every cup is posted in the Fair Ping Space on Challengermode.",
    link: { href: site.challengermode, label: "Open the Fair Ping Space" },
  },
  {
    title: "Sign up for the cup",
    body: "Pick a cup on the schedule and sign up. Entry is free, with 64 slots per cup.",
    link: { href: ROUTES.cups, label: "See the cup schedule" },
  },
  {
    title: "Check in 15 minutes before the start",
    body: "Check in on Challengermode. Players who are not checked in when the bracket starts are dropped.",
    link: { href: rulePath("check-in"), label: "Check-in rules" },
  },
  {
    title: "Join the Discord",
    body: "The cup realm is announced on Discord.",
    link: { href: site.discord, label: "Join the Discord" },
  },
  {
    title: "Screenshot each game",
    body: "Press Print Screen, WoW's default key, at the end of each game. The winner reports the score with the screenshots.",
    link: { href: rulePath("reporting"), label: "Reporting rules" },
  },
];

const needs: readonly ReactNode[] = [
  "A Challengermode account",
  <>
    A <TextLink href={site.discord}>Discord</TextLink> account
  </>,
  "A Horde character at the cup level on the cup realm",
  "Being online by 18:45 CET",
  "Being 18+ to receive a cash prize via Wise",
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function JoinPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Join a cup"
        title="Six steps to cup night."
        lede="Free entry, 64 slots, every second Sunday at 19:00 CET."
      >
        <ButtonLink href={site.challengermode}>Sign up on Challengermode</ButtonLink>
        <ButtonLink href={ROUTES.cups} variant="secondary">
          Cup schedule
        </ButtonLink>
      </PageHeader>

      <ol className="divide-y divide-line border-y border-line">
        {steps.map((step, i) => (
          <li
            key={step.title}
            id={`step-${i + 1}`}
            className="grid scroll-mt-6 grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 py-8 sm:grid-cols-[5rem_minmax(0,1fr)]"
          >
            <span className="font-display text-display leading-[0.8] text-muted tabular-nums">
              {pad(i + 1)}
            </span>
            <div>
              <h2 className="font-display text-base uppercase tracking-[0.06em]">{step.title}</h2>
              <p className="mt-2 max-w-xl text-sm text-muted text-pretty">{step.body}</p>
              <p className="mt-4 text-sm">
                <TextLink href={step.link.href}>{step.link.label}</TextLink>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Section id="what-you-need" eyebrow="What you need" tight>
        <ul className="divide-y divide-line border-y border-line">
          {needs.map((item, i) => (
            <li key={i} className="flex gap-3 py-4">
              <span aria-hidden="true" className="text-muted">
                –
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
