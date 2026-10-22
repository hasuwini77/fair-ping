import type { ReactNode } from "react";

/** One rule entry in the /rules rail layout. Rule entries are separated by space, not borders. */
export function RuleSection({
  id,
  label,
  number,
  children,
}: {
  id: string;
  label: string;
  number: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-8">
      <div className="group flex items-baseline gap-3">
        <h2
          id={`${id}-h`}
          className="flex items-baseline gap-3 font-display text-base uppercase tracking-[0.06em]"
        >
          <span className="text-accent tabular-nums">{number}</span>
          {label}
        </h2>
        <a
          href={`#${id}`}
          aria-label={`Link to ${label}`}
          className="-my-3 inline-flex size-11 items-center justify-center text-transparent transition-colors group-hover:text-muted focus-visible:text-muted"
        >
          #
        </a>
      </div>
      <div className="mt-4 space-y-4 text-muted text-pretty">{children}</div>
    </section>
  );
}

/** Rule list: ul.space-y-2, items flex gap-3 with an aria-hidden dash. */
export function RuleList({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true">–</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
