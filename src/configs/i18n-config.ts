export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'bg'],
};

export type Locale = (typeof i18n)['locales'][number];
