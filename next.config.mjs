/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_IS_TEMPLATE: process.env.IS_TEMPLATE ?? 'false',
  },
}

export default nextConfig
