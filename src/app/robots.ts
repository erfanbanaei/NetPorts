// app/robots.ts
import { MetadataRoute } from 'next';

// برای خروجی استاتیک (output: export) لازم است
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://netports.ir/sitemap.xml',
  };
}