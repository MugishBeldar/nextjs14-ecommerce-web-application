/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: false,
};

export default nextConfig;
