import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'
import { withSentryConfig } from '@sentry/nextjs'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      ...[
        baseUrl,
        'https://maps.googleapis.com',
        process.env.NEXT_PUBLIC_S3_HOSTNAME
          ? `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}`
          : null,
      ]
        .filter(Boolean)
        .map((item) => {
          try {
            const url = new URL(item)
            return {
              hostname: url.hostname,
              protocol: url.protocol.replace(':', ''),
            }
          } catch (error) {
            console.warn(`Invalid URL: ${item}`)
            return null
          }
        })
        .filter(Boolean),
    ],
  },
  reactStrictMode: true,
  redirects,
}

// Sentry Configuration
const sentryConfig = {
  org: 'mikecebul',
  project: 'cvx-jr-golf',
  sentryUrl: 'https://monitor.mikecebul.dev/',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
}

export default withSentryConfig(
  withPayload(nextConfig, { devBundleServerPackages: false }),
  sentryConfig,
)
