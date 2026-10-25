import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { publishedPosts, postUrl } from '../lib/blog';

export function getStaticPaths() {
  return site.url ? [{ params: { feed: 'rss' } }, { params: { feed: 'rss-en' } }, { params: { feed: 'sitemap' } }] : [];
}
const escape = (value: string) => value.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!);
export const GET: APIRoute = async ({ params }) => {
  const absolute = (path: string) => escape(new URL(path, site.url!).href);
  const english = params.feed === 'rss-en';
  const posts = await publishedPosts(english ? 'en' : 'ko');
  const allPosts = [...await publishedPosts('ko'), ...await publishedPosts('en')];
  const body = params.feed !== 'sitemap'
    ? `<rss version="2.0"><channel><title>${english ? 'Miroven Blog' : 'Miroven 블로그'}</title><link>${absolute(english ? '/en/blog/' : '/ko/blog/')}</link><description>${escape(english ? 'Guides and stories about journaling with Miroven.' : site.description)}</description><language>${english ? 'en' : 'ko'}</language>${posts.map(post => `<item><title>${escape(post.data.title)}</title><description>${escape(post.data.description)}</description><link>${absolute(postUrl(post.id))}</link><guid isPermaLink="true">${absolute(postUrl(post.id))}</guid><pubDate>${post.data.publishedAt.toUTCString()}</pubDate></item>`).join('')}</channel></rss>`
    : `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['ko', 'en'].flatMap(locale => ['/' + locale + '/', '/' + locale + '/blog/', '/' + locale + '/help/', '/' + locale + '/security/']).concat(allPosts.map(post => postUrl(post.id))).map(path => `<url><loc>${absolute(path)}</loc></url>`).join('')}</urlset>`;
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>${body}`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
