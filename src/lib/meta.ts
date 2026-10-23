import type { Metadata } from "next";

const RSS_ALTERNATE = { "application/rss+xml": [{ url: "/feed.xml", title: "Fair Ping cups" }] };

/** Site-wide OG card (the brand kit PNG). Cup pages override it with their own opengraph-image.tsx. */
const OG_IMAGE = {
  url: "/brand/og-1200x630.png",
  width: 1200,
  height: 630,
  alt: "Fair Ping: free WoW Forever duel cups on EU realms",
};

/**
 * Per-page canonical, og:url and the site OG card (pass siteImage: false where a
 * segment ships its own opengraph-image). Spread into a page's metadata. Next replaces
 * nested `alternates` and `openGraph` objects instead of merging them with the
 * layout's, so this carries the RSS alternate and the OG site fields along.
 */
export function pageUrl(
  path: string,
  { siteImage = true }: { siteImage?: boolean } = {},
): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path, types: RSS_ALTERNATE },
    openGraph: {
      siteName: "Fair Ping",
      type: "website",
      locale: "en_GB",
      url: path,
      ...(siteImage ? { images: [OG_IMAGE] } : {}),
    },
  };
}
