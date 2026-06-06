import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Disallow backend scaffold pages
      { userAgent: "*", disallow: ["/auth/", "/admin/", "/premium/", "/pricing/", "/api/"] },
    ],
    sitemap: "https://misskatiesclass.com/sitemap.xml",
  }
}
