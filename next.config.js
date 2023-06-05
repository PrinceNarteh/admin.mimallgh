/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "loremflickr.com", "localhost","api.mimall.com"],
  },
};

module.exports = nextConfig;
