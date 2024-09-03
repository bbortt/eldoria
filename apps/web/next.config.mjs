/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.ELDORIA_BASE_PATH ?? '',
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['ui', 'tailwind-config'],
};

export default nextConfig;
