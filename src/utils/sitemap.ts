import { Area, Category, Principle } from '@/types';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemap(areas: Area[]): string {
  const baseUrl = 'https://arkitektur.nordrefollo.kommune.no';
  const urls: SitemapURL[] = [];

  // Add home page
  urls.push({
    loc: baseUrl,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1.0
  });

  // Add areas
  areas.forEach(area => {
    urls.push({
      loc: `${baseUrl}/areas/${area.id}`,
      lastmod: area.created_at,
      changefreq: 'weekly',
      priority: 0.8
    });

    // Add categories
    area.categories.forEach(category => {
      urls.push({
        loc: `${baseUrl}/areas/${area.id}/categories/${category.id}`,
        lastmod: category.created_at,
        changefreq: 'weekly',
        priority: 0.6
      });

      // Add principles
      category.principles.forEach(principle => {
        urls.push({
          loc: `${baseUrl}/areas/${area.id}/categories/${category.id}/principles/${principle.id}`,
          lastmod: principle.created_at,
          changefreq: 'weekly',
          priority: 0.4
        });
      });
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return xml;
}