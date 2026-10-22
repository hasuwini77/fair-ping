import Link from "next/link";
import { isPageRoute } from "@/components/ui";
import { FOOTER_LINKS } from "@/config/routes";
import { licenseLine, site } from "@/config/site";

const LINK = "inline-flex min-h-11 items-center px-2 transition-colors hover:text-paper";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-start sm:justify-between sm:gap-10">
      <p className="max-w-xl text-pretty">{licenseLine}</p>
      <ul className="-mx-2 flex shrink-0 flex-wrap">
        {FOOTER_LINKS.map((link) => (
          <li key={link.href}>
            {isPageRoute(link.href) ? (
              <Link href={link.href} className={LINK}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className={LINK}>
                {link.label}
              </a>
            )}
          </li>
        ))}
        <li>
          <a href={site.discord} className={LINK}>
            Discord
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className={LINK}>
            {site.email}
          </a>
        </li>
      </ul>
    </footer>
  );
}
