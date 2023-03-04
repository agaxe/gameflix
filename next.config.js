/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.igdb.com', 'static-cdn.jtvnw.net']
  }
};

module.exports = nextConfig;
