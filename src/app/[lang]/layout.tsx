import React from 'react';

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import Navigation from '@/partials/global/navigation/navigation';
import { ThemeProvider } from '@/context/ThemeProvider';

const inter = Inter({ subsets: ['latin', 'cyrillic-ext'] });
const locales = ['en', 'de'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const locale = useLocale();
  const messages = useMessages();

  if (params.lang !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} flex hidden flex-row bg-background text-text`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navigation />
            <main className='w-full pl-60'>{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'LensLend',
  description: 'Generated by create next app',
  applicationName: 'LensLend',
  keywords: [],
  creator: 'Kaloyan Doychinov',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    determiner: 'auto',
    title: 'LensLend',
    description: 'Generated by create next app',
    emails: ['kaloyan@kaloyan.tech'],
    siteName: 'LensLend',
    locale: 'en_US',
    alternateLocale: 'bg_BG',
    images: ['/og-image.png'],
    url: 'https://lenslend.kaloyan.tech',
  },
  twitter: {
    site: 'https://lenslend.kaloyan.tech',
    card: 'summary_large_image',
    creator: '@lenslendv',
    title: 'LensLend',
    description: 'Generated by create next app',
    images: '/og-image.png',
  },
  appleWebApp: {
    capable: true,
    title: 'LensLend',
    startupImage: [
      // iPhone Xs Max (1242px x 2688px)
      {
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        url: '/assets/splash-screens/1242x2688.png',
      },
      // iPhone Xr (828px x 1792px)
      {
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/828x1792.png',
      },
      // iPhone X, Xs (1125px x 2436px)
      {
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        url: '/assets/splash-screens/1125x2436.png',
      },
      // iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px)
      {
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
        url: '/assets/splash-screens/1242x2208.png',
      },
      // iPhone 8, 7, 6s, 6 (750px x 1334px)
      {
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/750x1334.png',
      },
      // iPhone SE (640px x 1136px)
      {
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/640x1136.png',
      },
      // iPad Pro 12.9" (2048px x 2732px)
      {
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/2048x2732.png',
      },
      // iPad Pro 11” (1668px x 2388px)
      {
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/1668x2388.png',
      },
      // iPad Pro 10.5" (1668px x 2224px)
      {
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/1668x2224.png',
      },
      // iPad Mini, Air (1536px x 2048px)
      {
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/1536x2048.png',
      },
      // iPhone 13 Pro Max (1284px x 2778px)
      {
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)',
        url: '/assets/splash-screens/1284x2778.png',
      },
      // 1640 x 2360 px	iPad Air 10.9"
      {
        media:
          '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/1640x2360.png',
      },
      // 1620 x 2160 px	iPad 10.2"
      {
        media:
          '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/1620x2160.png',
      },
      // 1488 x 2266 px	iPad Mini 8.3"
      {
        media:
          '(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2)',
        url: '/assets/splash-screens/1488x2266.png',
      },
      // 1290 x 2796 px	iPhone 14 Pro Max
      {
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
        url: '/assets/splash-screens/1290x2796.png',
      },
      // 1179 x 2556 px	iPhone 14 Pro
      {
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)',
        url: '/assets/splash-screens/1179x2556.png',
      },
      // 1170 x 2532 px	iPhone 14 & iPhone 13 Pro & iPhone 12 Pro & iPhone 13 & iPhone 12
      {
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)',
        url: '/assets/splash-screens/1170x2532.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      color: '#EEF4F6',
      media: '(prefers-color-scheme: light)',
    },
    {
      color: '#232429',
      media: '(prefers-color-scheme: dark)',
    },
  ],
};