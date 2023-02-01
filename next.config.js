/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en", // default lang fr
  },
  reactStrictMode: false,
  images: {
    domains: [
      "allfreechips.com",
      "www.allfreechips.com",
      "afc-redux.vercel.app",
      "radiumpowered.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
