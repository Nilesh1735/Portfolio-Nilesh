import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.site;
  return [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
