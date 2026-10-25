export const languages = {
  ko: { label: '한국어', enabled: true },
  en: { label: 'English', enabled: true },
} as const;
export type Locale = keyof typeof languages;
export const defaultLocale: Locale = 'ko';
export const localeFromPath = (path: string): Locale => path.startsWith('/en/') ? 'en' : 'ko';
export const ko = { navigation: { product: '제품 소개', blog: '블로그', help: '도움말', security: '보안' }, app: 'Miroven 시작하기' };
export const en = { navigation: { product: 'Product', blog: 'Blog', help: 'Help', security: 'Security' }, app: 'Open Miroven' };
export const messages = { ko, en };
