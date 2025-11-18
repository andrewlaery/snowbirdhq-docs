  import { withContentlayer } from 'next-contentlayer'

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // Remove swcMinify - it's default in Next.js 15
    reactStrictMode: true,
  }

  export default withContentlayer(nextConfig)
