/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: (process.env.ELDORIA_ASSET_PATH ?? '') + '/', // assetPrefix requires the trailing slash
  basePath: process.env.ELDORIA_BASE_PATH ?? '',
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['ui', 'tailwind-config'],
};

export default nextConfig;
