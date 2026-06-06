import { MetadataRoute } from "next"
import { categoryMeta } from "@/lib/categorise"
import { worksheets } from "@/lib/worksheetData"

const BASE = "https://misskatiesclass.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryUrls = Object.keys(categoryMeta).map((slug) => ({
    url: `${BASE}/category/${slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }))

  const worksheetUrls = worksheets.map((ws) => ({
    url: `${BASE}/worksheets/${ws.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }))

  return [
    { url: BASE, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE}/videos`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/play`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/worksheets`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/activity`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE}/progress`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE}/shop`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE}/personalised`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: new Date(), priority: 0.3 },
    ...categoryUrls,
    ...worksheetUrls,
  ]
}
