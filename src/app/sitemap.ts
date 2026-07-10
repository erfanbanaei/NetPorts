import { nameToSlug, protocolsData } from '@/lib/protocols';

// app/sitemap.ts
import { MetadataRoute } from 'next';

// برای خروجی استاتیک (output: export) لازم است
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://netports.ir'; // آدرس سایت خود را وارد کنید

  // صفحات داینامیک پروتکل‌ها
  const protocolEntries = protocolsData.map((p) => ({
    url: `${baseUrl}/protocol/${nameToSlug(p.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...protocolEntries,
  ];
}