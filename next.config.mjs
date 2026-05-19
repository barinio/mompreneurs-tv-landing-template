/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_IS_TEMPLATE: process.env.IS_TEMPLATE ?? 'false',
  },
  eslint: {
    // Lint runs separately in CI; don't block builds on lint warnings.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
