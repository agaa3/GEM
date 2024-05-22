/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'news.utexas.edu'
      },
      {
        protocol: 'https',
        hostname: 'static.berkutschi.com'
      },
    ]
  }
}

