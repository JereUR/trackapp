/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/panel-de-control',
        permanent: true
      }
    ]
  }
}

export default nextConfig
