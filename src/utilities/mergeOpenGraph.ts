import type { Metadata } from 'next'
import { baseUrl } from './baseUrl'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'CVX Junior Golf',
  images: [
    {
      url: `${baseUrl}/golf-hero.jpg`,
    },
  ],
  siteName: 'CVX Junior Golf',
  title: 'CVX Junior Golf',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
