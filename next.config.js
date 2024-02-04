const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080' },
  images: {
    domains: ['localhost', 'tuesfest.bg', 'storage.lenslend.kaloyan.tech'],
  },
  serverRuntimeConfig: {
    withNextIntl: {
      availableLocales: ['en', 'bg'],
      defaultLocale: 'en',
    },
  },
};

module.exports = withNextIntl(nextConfig);
