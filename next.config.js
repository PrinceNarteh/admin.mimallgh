/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "loremflickr.com", "localhost"],
  },
};

module.exports = nextConfig;
