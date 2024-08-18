/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
	transpilePackages: ["ui", "tailwind-config"],
};

export default nextConfig;
