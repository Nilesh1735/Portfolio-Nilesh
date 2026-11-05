import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.site;
  // Every indexable route. /about and /contact were added with the redesign
  // and were missing here, so search engines had no way to discover them.
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
