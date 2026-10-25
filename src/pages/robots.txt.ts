import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => new Response(
  site.url ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n` : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
