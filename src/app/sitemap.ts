import type { MetadataRoute } from "next";
import { STATIC_PAGES, absoluteUrl, cupPath } from "@/config/routes";
import { CUPS_UPDATED_AT, cups } from "@/data/cups";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PAGES, ...cups.map((c) => cupPath(c.number))];
  return paths.map((path) => ({ url: absoluteUrl(path), lastModified: CUPS_UPDATED_AT }));
}
