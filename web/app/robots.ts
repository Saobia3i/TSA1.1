import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/', '/dashboard/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'CCBot', 'anthropic-ai', 'Claude-Web', 'PerplexityBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.tensorsecurityacademy.com/sitemap.xml',
  }
}