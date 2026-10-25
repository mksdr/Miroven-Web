import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import assert from 'node:assert/strict';

const dist = resolve('dist');
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}
const files = await filesIn(dist);
const htmlFiles = files.filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const locale = file.startsWith(join(dist, 'en') + '/') || file.startsWith(join(dist, 'en') + '\\') ? 'en' : 'ko';
  assert(html.includes(`<html lang="${locale}"`), `${file}: 문서 언어`);
  assert(!html.includes('miroven.example'), `${file}: 예시 도메인 노출`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, 'https://test.invalid');
    const path = decodeURIComponent(url.pathname);
    const target = join(dist, path, extname(path) ? '' : 'index.html');
    assert(await stat(target).then(s => s.isFile()).catch(() => false), `${file}: 끊어진 내부 링크 ${href}`);
    if (url.hash && target.endsWith('.html')) {
      const targetHtml = await readFile(target, 'utf8');
      assert(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: 없는 앵커 ${href}`);
    }
  }
}
for (const route of ['ko/index.html', 'ko/blog/index.html', 'ko/help/index.html', 'ko/security/index.html', 'ko/terms/index.html', 'ko/privacy/index.html', 'en/index.html', 'en/blog/index.html', 'en/help/index.html', 'en/security/index.html', 'en/terms/index.html', 'en/privacy/index.html', '404.html']) {
  assert(files.includes(join(dist, route)), `필수 페이지 누락: ${route}`);
}
for (const locale of ['ko', 'en']) for (const name of ['terms', 'privacy']) {
  const html = await readFile(join(dist, locale, name, 'index.html'), 'utf8');
  assert.match(html, /noindex/, '정책 페이지의 기존 색인 제외 설정 유지');
}
const origin = 'https://miroven.mksdr.bid';
const appUrl = 'https://miroven-app.mksdr.bid';
for (const file of htmlFiles) {
  const route = '/' + file.slice(dist.length + 1).replaceAll('\\', '/').replace(/index\.html$/, '');
  if (!/^\/(ko|en)\//.test(route)) continue;
  const html = await readFile(file, 'utf8');
  assert(html.includes(`rel="canonical" href="${origin}${route}"`), `${route}: 공식 canonical 누락`);
  assert(html.includes(`property="og:url" content="${origin}${route}"`), `${route}: 공식 OG URL 누락`);
  assert(html.includes(`href="${appUrl}"`), `${route}: 공식 앱 이동 누락`);
  assert(html.includes('href="mailto:miroven@mksdr.bid"'), `${route}: 문의 누락`);
  if (/^\/(ko|en)\/(terms|privacy)\/$/.test(route)) continue;
  assert(html.includes('content="index, follow"'), `${route}: 일반 페이지 색인 허용 누락`);
  assert(!/공개 준비|공개를 준비|공개 전에 안내|지금은 공개/.test(html), `${route}: 서비스 준비 문구 잔존`);
}
const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
assert.match(robots, /Allow: \//, '공식 사이트 수집 허용');
assert(!robots.includes('Disallow: /'), '공식 사이트 수집 차단 잔존');
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), '공식 sitemap 안내 누락');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const rss = await readFile(join(dist, 'rss.xml'), 'utf8');
assert(sitemap.includes(`<loc>${origin}/ko/</loc>`), 'sitemap 공식 홈 누락');
assert(!/\/(ko|en)\/(terms|privacy)\//.test(sitemap), '정책 페이지의 기존 sitemap 제외 설정 유지');
assert(rss.includes(`<link>${origin}/ko/blog/</link>`), 'RSS 공식 블로그 주소 누락');
assert(rss.includes('<item>'), 'RSS 게시글 누락');
const notFound = await readFile(join(dist, '404.html'), 'utf8');
assert.match(notFound, /noindex/, '404 색인 제외');
console.log(`${htmlFiles.length}개 HTML의 내부 링크·앵커·언어·필수 페이지·정책 색인 및 공식 주소·앱 이동·검색 설정 확인 완료.`);

for (const policy of ['terms', 'privacy']) {
  const ko = await readFile(join(dist, 'ko', policy, 'index.html'), 'utf8');
  const en = await readFile(join(dist, 'en', policy, 'index.html'), 'utf8');
  assert(en.includes('The Korean version is authoritative.'), policy + ': 한국어 원문 기준 누락');
  assert(en.includes('the Korean version prevails'), policy + ': 한국어 우선 안내 누락');
  assert(en.includes('subject to mandatory applicable law'), policy + ': 강행규정 보호 누락');
  assert(en.includes('href="/ko/' + policy + '/" lang="ko" hreflang="ko"'), policy + ': 원문 링크 누락');
  assert(en.includes('Effective October 25, 2026.'), policy + ': 시행일 누락');
  assert.equal((en.match(/<h2[ >]/g) || []).length, (ko.match(/<h2[ >]/g) || []).length, policy + ': 조항 수 불일치');
}
assert(sitemap.includes('<loc>' + origin + '/en/</loc>'), 'sitemap 영어 홈 누락');
const englishRss = await readFile(join(dist, 'rss-en.xml'), 'utf8');
assert(englishRss.includes('<language>en</language>'), '영어 RSS 언어 누락');
assert(englishRss.includes('<link>' + origin + '/en/blog/</link>'), '영어 RSS 블로그 누락');
assert(englishRss.includes('<item>'), '영어 RSS 게시글 누락');
for (const locale of ['ko', 'en']) {
  const html = await readFile(join(dist, locale, 'help/index.html'), 'utf8');
  const alternate = locale === 'ko' ? 'en' : 'ko';
  assert(html.includes('href="/' + alternate + '/help/" lang="' + alternate + '"'), '같은 문서 언어 전환 누락');
}
console.log('영어 정책의 한국어 원문 기준·시행일·조항 수·언어 전환·영어 RSS 확인 완료.');
