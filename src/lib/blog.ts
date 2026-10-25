import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';

export async function publishedPosts(locale: Locale = 'ko') {
  const now = new Date();
  return (await getCollection('blog', ({ data }) =>
    data.locale === locale && !data.draft && data.publishedAt <= now,
  )).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}
export function postUrl(id: string) { return `/${id.split('/')[0]}/blog/${id.split('/').pop()}/`; }
export function formatDate(date: Date, locale: Locale = 'ko') {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ko-KR', { dateStyle: 'long', timeZone: 'Asia/Seoul' }).format(date);
}
