import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/globals/Footer/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'
import { draftMode } from 'next/headers'
import { Header } from '@/globals/Header/Component'
import { ThemeProvider } from 'next-themes'
import { baseUrl } from '@/utilities/baseUrl'
import { Analytics } from '@vercel/analytics/react'

export const dynamic = 'force-static'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(inter.className)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="flex flex-col min-h-dvh">
        <ThemeProvider forcedTheme="light">
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />
          <Header />
          <div className="grow">{children}</div>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@mikecebul',
  },
}
