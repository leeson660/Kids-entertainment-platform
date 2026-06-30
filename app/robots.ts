import { MetadataRoute } from "next"

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://[your-domain].com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Disallow backend scaffold pages
      { userAgent: "*", disallow: ["/auth/", "/admin/", "/premium/", "/pricing/", "/api/"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
