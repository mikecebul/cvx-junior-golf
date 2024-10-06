import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'
import { baseUrl } from '@/utilities/baseUrl.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[
        baseUrl,
        'https://images.unsplash.com',
        'https://maps.googleapis.com',
        'https://cvx-junior-golf.vercel.app',
        'https://cvx-junior-golf.mikecebul.dev',
      ].map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
  async rewrites() {
    return [
      {
        source: '/RDFK',
        destination: '/rdfk',
      },
    ]
  },
}

export default withPayload(nextConfig)
