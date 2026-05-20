/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/registry',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
