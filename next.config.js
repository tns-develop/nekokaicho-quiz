/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  output: 'standalone',
}

images.unoptimized = true
module.exports = nextConfig
