import { CopyButton } from "@/components/biz/CopyButton";
import type { Snippet } from "@/data/press";

export function SnippetBlock({ snippet }: { snippet: Snippet }) {
  const { id, title, text } = snippet;
  const words = text.trim().split(/\s+/).length;
  return (
    <section id={`snippet-${id}`} data-copy-block className="rounded-lg border border-line bg-panel">
      <header className="flex items-center justify-between gap-4 border-b border-line py-2 pr-2 pl-5">
        <h3 className="font-display text-base uppercase tracking-[0.06em]">
          {title}
          <span className="ml-2 font-sans text-sm font-normal normal-case tracking-normal text-muted tabular-nums">
            {words} words
          </span>
        </h3>
        <CopyButton text={text} label={title.toLowerCase()} />
      </header>
      <p data-copy-source className="whitespace-pre-line p-5 text-pretty break-words">
        {text}
      </p>
    </section>
  );
}
