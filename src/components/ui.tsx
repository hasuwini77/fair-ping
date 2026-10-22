import Link from "next/link";
import type { ReactNode } from "react";

/** next/link only for page routes: starts with "/" and has no file extension. */
export function isPageRoute(href: string): boolean {
  if (!href.startsWith("/")) return false;
  const path = href.split(/[?#]/)[0];
  return !/\.[a-z0-9]+$/i.test(path);
}

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function Eyebrow({
  children,
  as = "p",
  id,
}: {
  children: ReactNode;
  as?: "p" | "h2";
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className="text-sm font-medium uppercase tracking-[0.12em] text-accent">
      {children}
    </Tag>
  );
}

export function Heading({
  children,
  as = "h2",
  size = "display",
  id,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "base";
  id?: string;
}) {
  const Tag = as;
  const cls =
    size === "display"
      ? "font-display text-display leading-[0.95] tracking-[-0.01em] uppercase text-balance"
      : "font-display text-base uppercase tracking-[0.06em]";
  return (
    <Tag id={id} className={cls}>
      {children}
    </Tag>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="pt-16 pb-16 sm:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-5 max-w-3xl font-display text-display leading-[0.92] tracking-[-0.01em] uppercase text-balance">
        {title}
      </h1>
      {lede ? <p className="mt-6 max-w-xl text-muted text-pretty">{lede}</p> : null}
      {children ? <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div> : null}
    </header>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  tight = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  tight?: boolean;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-h` : undefined;
  const hasHeading = Boolean(title || eyebrow);
  return (
    <section
      id={id}
      aria-labelledby={id && hasHeading ? headingId : undefined}
      className={"scroll-mt-6 border-t border-line " + (tight ? "py-16" : "py-20")}
    >
      {title ? (
        <>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <div className="mt-5">
            <Heading as="h2" id={headingId}>
              {title}
            </Heading>
          </div>
          {children}
        </>
      ) : (
        <>
          {eyebrow ? (
            <Eyebrow as="h2" id={headingId}>
              {eyebrow}
            </Eyebrow>
          ) : null}
          <div className={eyebrow ? "mt-8" : undefined}>{children}</div>
        </>
      )}
    </section>
  );
}

export function FactGrid({ items }: { items: readonly { label: string; value: ReactNode }[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="bg-ink p-5 sm:last:odd:col-span-2">
          <dt className="text-sm text-muted">{item.label}</dt>
          <dd className="mt-1 tabular-nums">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const BUTTON_BASE = "inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-medium";
const BUTTON_PRIMARY = `${BUTTON_BASE} bg-accent text-ink transition-transform active:scale-[0.96]`;
const BUTTON_SECONDARY = `${BUTTON_BASE} border border-line transition-[border-color,scale] hover:border-muted active:scale-[0.96]`;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean | string;
}) {
  const cls = variant === "primary" ? BUTTON_PRIMARY : BUTTON_SECONDARY;
  if (isPageRoute(href)) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} download={download}>
      {children}
    </a>
  );
}

const TEXT_LINK = "text-paper underline decoration-line underline-offset-4 transition-colors hover:decoration-accent";

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = className ? `${TEXT_LINK} ${className}` : TEXT_LINK;
  if (isPageRoute(href)) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
      {isExternal(href) ? <span aria-hidden="true"> ↗</span> : null}
    </a>
  );
}
