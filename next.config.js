/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['picsum.photos'],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
