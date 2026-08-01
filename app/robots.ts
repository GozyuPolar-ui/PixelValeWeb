import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout/", "/profile/", "/library", "/notifications"],
    },
    sitemap: "https://pixelvale.my.id/sitemap.xml",
  };
}