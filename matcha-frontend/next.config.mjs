/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API: process.env.API,
    BACKEND_LOCAL_DEV: process.env.BACKEND_LOCAL_DEV,
    BACKEND_PORT: process.env.BACKEND_PORT,
  },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
