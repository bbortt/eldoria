/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: (process.env.NEXT_PUBLIC_ELDORIA_BASE_PATH ?? '') + '/', // assetPrefix requires the trailing slash
  basePath: process.env.NEXT_PUBLIC_ELDORIA_BASE_PATH ?? '',
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['tailwind-config', 'ui'],
};

export default nextConfig;
