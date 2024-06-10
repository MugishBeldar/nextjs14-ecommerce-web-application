/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
