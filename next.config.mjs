/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    outputStandalone: true
  },
  compiler: {
    removeConsole: false, //process.env.ENV === 'prod',
    exclude: ['error']
  }
}

export default nextConfig