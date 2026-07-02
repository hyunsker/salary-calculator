import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://salary-calculator-bay.vercel.app/sitemap.xml",
    host: "https://salary-calculator-bay.vercel.app",
  };
}
