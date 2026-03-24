import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const publicDisallowRules = ["/api/", "/admin/", "/private/", "/dashboard/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: publicDisallowRules,
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-News",
          "Google-InspectionTool",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Google-Extended",
          "GoogleOther",
          "GoogleOther-Image",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Perplexity-User",
          "PerplexityBot",
          "Bytespider",
          "Meta-ExternalAgent",
          "meta-externalagent",
          "FacebookBot",
          "Applebot",
          "Amazonbot",
        ],
        allow: "/",
        disallow: publicDisallowRules,
      },
    ],
    host: "https://tensorsecurityacademy.com",
    sitemap: "https://tensorsecurityacademy.com/sitemap.xml",
  };
}
