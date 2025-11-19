import { headers } from 'next/headers';
import { getDomainByHost } from '@/lib/domains';

/**
 * Generate robots.txt for the site
 * Multi-domain aware - returns appropriate robots.txt based on request host
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default async function robots() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const domain = getDomainByHost(host);
  const baseUrl = domain.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: domain.robots.allow,
        disallow: domain.robots.disallow,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
