import Link from "next/link";
import { Blades } from "@/components/Blades";
import { TwitchIcon, XIcon } from "@/components/icons";
import { NAV_LINKS } from "@/config/routes";
import { site } from "@/config/site";

const ICON_LINK =
  "inline-flex min-h-11 min-w-11 items-center justify-center px-2 transition-colors hover:text-paper";

export function SiteNav() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-10 rounded-md bg-accent px-4 py-3 text-sm font-medium text-ink"
      >
        Skip to content
      </a>
      <header className="flex flex-wrap items-center justify-between gap-y-1 py-5">
        <Link href="/" aria-label="Fair Ping home" className="-ml-1 flex min-h-11 items-center gap-2.5 pr-2 pl-1">
          <Blades className="size-7 text-accent" />
          <span className="font-display text-base uppercase tracking-[0.06em]">Fair Ping</span>
        </Link>
        <nav aria-label="Main" className="order-3 w-full border-t border-line sm:order-2 sm:w-auto sm:border-0">
          <ul className="flex justify-between text-sm text-muted sm:gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-paper sm:px-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul
          aria-label="Social"
          className="order-2 -mr-2 flex text-sm text-muted sm:order-3 sm:ml-3 sm:border-l sm:border-line sm:pl-3"
        >
          <li>
            <a href={site.x} aria-label="Fair Ping on X" className={ICON_LINK}>
              <XIcon className="size-5" />
            </a>
          </li>
          <li>
            <a href={site.twitch} aria-label="Fair Ping on Twitch" className={ICON_LINK}>
              <TwitchIcon className="size-5" />
            </a>
          </li>
        </ul>
      </header>
    </>
  );
}
