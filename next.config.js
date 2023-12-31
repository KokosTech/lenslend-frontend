const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080" },
  images: {
    domains: ["localhost", "tuesfest.bg"],
  },
};

module.exports = withNextIntl(nextConfig);
