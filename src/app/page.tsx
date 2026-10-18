import { Blades } from "@/components/Blades";
import { crew, faq, format, site } from "@/config/site";

const joinUrl = site.discord || site.challengermode;
const joinLabel = site.discord ? "Join the Discord" : "Follow on Challengermode";

const PING = [
  { where: "US beta, played from Europe", ms: "100–300 ms", width: "w-full", tone: "bg-muted/40" },
  { where: "EU realm, played from Europe", ms: "under 40 ms", width: "w-[14%]", tone: "bg-accent" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent">{children}</p>;
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-display leading-[0.95] tracking-[-0.01em] uppercase text-balance">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <header className="flex items-center justify-between py-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Fair Ping home">
          <Blades className="size-7 text-accent" />
          <span className="font-display text-base uppercase tracking-[0.06em]">Fair Ping</span>
        </a>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <a href="#format" className="hidden py-3 transition-colors hover:text-paper sm:inline">Format</a>
          <a href="#crew" className="hidden py-3 transition-colors hover:text-paper sm:inline">Crew</a>
          <a href={site.x} className="py-3 transition-colors hover:text-paper">X</a>
          <a href={site.twitch} className="py-3 transition-colors hover:text-paper">Twitch</a>
        </nav>
      </header>

      <main id="top">
        <section className="relative isolate pt-16 pb-20 sm:pt-24">
          <Blades className="pointer-events-none absolute top-20 right-0 -z-10 hidden size-80 text-panel md:block lg:size-96" />
          <Eyebrow>WoW Forever · EU realms</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-display leading-[0.92] tracking-[-0.01em] uppercase text-balance">
            Free duel cups. Same ping for everyone.
          </h1>
          <p className="mt-6 max-w-xl text-muted text-pretty">
            1v1 duel cups on EU realms, every second Sunday at 19:00 CET. No entry fee, no lag
            handicap for Europe.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={joinUrl}
              className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-ink transition-transform active:scale-[0.96]"
            >
              {joinLabel}
            </a>
            <a
              href={site.x}
              className="rounded-md border border-line px-5 py-3 text-sm font-medium transition-[border-color,scale] hover:border-muted active:scale-[0.96]"
            >
              Follow @fairping
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            Cup #1: late November, level 30. The date goes out on Discord first.
          </p>
        </section>

        <section aria-labelledby="ping" className="border-t border-line py-20">
          <Eyebrow>Why EU realms</Eyebrow>
          <div className="mt-5">
            <Heading>
              <span id="ping">Nobody starts behind.</span>
            </Heading>
          </div>
          <p className="mt-6 max-w-xl text-muted text-pretty">
            The big Forever events so far ran on the US-only beta. From Europe, every global
            cooldown and interrupt landed late.
          </p>
          <ul className="mt-10 space-y-6">
            {PING.map((row) => (
              <li key={row.where}>
                <p className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-muted">{row.where}</span>
                  <span className="tabular-nums">{row.ms}</span>
                </p>
                <div className="mt-2 h-2 rounded-full bg-panel" aria-hidden="true">
                  <div className={`h-2 rounded-full ${row.width} ${row.tone}`} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="format" className="scroll-mt-6 border-t border-line py-20">
          <Eyebrow>How a cup works</Eyebrow>
          <div className="mt-5">
            <Heading>Sign up, duel, report.</Heading>
          </div>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {format.map((item) => (
              <div key={item.label} className="bg-ink p-5">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="mt-1">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted">
            Brackets and sign-ups run on{" "}
            <a href={site.challengermode} className="text-paper underline decoration-line underline-offset-4 hover:decoration-accent">
              Challengermode
            </a>
            . Every result needs a screenshot, and a no-show after 10 minutes is a loss.
          </p>
        </section>

        <section id="crew" className="scroll-mt-6 border-t border-line py-20">
          <Eyebrow>Crew wanted</Eyebrow>
          <div className="mt-5">
            <Heading>Help run the cups.</Heading>
          </div>
          <p className="mt-6 max-w-xl text-muted text-pretty">
            Unpaid at the start. Sponsor money is split between the crew by a rule we write down
            before cup #1, and your name goes on every event.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {crew.map((c) => (
              <li key={c.role} className="flex flex-col rounded-lg border border-line bg-panel p-5">
                <h3 className="font-display text-base uppercase tracking-[0.06em]">{c.role}</h3>
                <p className="mt-3 flex-1 text-sm text-muted text-pretty">{c.body}</p>
                <p className="mt-5 text-sm text-accent tabular-nums">{c.time}</p>
              </li>
            ))}
          </ul>
          <a
            href={joinUrl}
            className="mt-8 inline-block rounded-md border border-line px-5 py-3 text-sm font-medium transition-[border-color,scale] hover:border-muted active:scale-[0.96]"
          >
            {site.discord ? "Say hi on Discord" : `Email ${site.email}`}
          </a>
        </section>

        <section className="border-t border-line py-20">
          <Eyebrow>Questions</Eyebrow>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  {item.q}
                  <span className="text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm text-muted text-pretty">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-3 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Not endorsed by Blizzard Entertainment. World of Warcraft is a trademark of Blizzard Entertainment.</p>
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-paper">
          {site.email}
        </a>
      </footer>
    </div>
  );
}
