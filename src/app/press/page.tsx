import type { Metadata } from "next";
import Image from "next/image";
import { SnippetBlock } from "@/components/biz/SnippetBlock";
import { ButtonLink, FactGrid, PageHeader, Section, TextLink } from "@/components/ui";
import { site } from "@/config/site";
import { LICENSE_URL } from "@/data/ledger";
import { brandRules, brandZip, logoTiles, snippets } from "@/data/press";

export const metadata: Metadata = {
  title: "Press kit",
  description:
    "Logos, brand rules and ready-to-paste copy for writing about Fair Ping: a boilerplate, an announcement, a stream description and a Discord post.",
};

const facts = [
  { label: "Format", value: "1v1 duels, single elimination" },
  { label: "Region", value: "EU realms" },
  { label: "Schedule", value: "Every second Sunday, 19:00 CET" },
  { label: "Entry", value: "Free" },
  { label: "License", value: <TextLink href={LICENSE_URL}>Blizzard Community Competition License</TextLink> },
  { label: "Press contact", value: <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink> },
];

const DOWNLOAD =
  "inline-flex min-h-11 items-center px-2 text-sm text-muted transition-colors hover:text-paper";

export default function PressPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Press kit"
        title="Press"
        lede="Logos, copy and facts for writing about Fair Ping. Use them as they are."
      >
        <ButtonLink href={`/brand/${brandZip}`} download>
          Download all (.zip)
        </ButtonLink>
      </PageHeader>

      <Section tight eyebrow="Logos">
        <ul className="grid gap-4 sm:grid-cols-2">
          {logoTiles.map((tile) => (
            <li key={tile.id}>
              <figure className="overflow-hidden rounded-lg border border-line">
                <div className={`relative aspect-[3/2] ${tile.bg}`}>
                  <Image
                    src={`/brand/${tile.preview}`}
                    alt={tile.alt}
                    fill
                    sizes="(min-width: 640px) 512px, 100vw"
                    unoptimized={tile.preview.endsWith(".svg")}
                    className={tile.fit === "pad" ? "object-contain p-10" : "object-contain"}
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t border-line py-1 pr-2 pl-4">
                  <span className="text-sm">{tile.title}</span>
                  <span className="flex">
                    {tile.files.map((f) => (
                      <a key={f.file} href={`/brand/${f.file}`} download className={DOWNLOAD}>
                        <span className="tabular-nums">{f.label}</span>
                        <span className="sr-only"> {f.sr}</span>
                      </a>
                    ))}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Section tight eyebrow="Brand rules">
        <ul className="divide-y divide-line border-y border-line">
          {brandRules.map((rule) => (
            <li key={rule} className="flex gap-3 py-4">
              <span aria-hidden="true" className="text-muted">
                –
              </span>
              <span className="text-pretty">{rule}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tight eyebrow="Copy">
        <div className="space-y-4">
          {snippets.map((snippet) => (
            <SnippetBlock key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </Section>

      <Section tight eyebrow="Facts">
        <FactGrid items={facts} />
      </Section>
    </main>
  );
}
