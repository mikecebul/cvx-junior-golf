import type { Metadata } from 'next'

import type { Page } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: { doc: Page }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.metadata?.image === 'object' &&
    !!doc.meta.metadata.image &&
    typeof doc.meta.metadata.image.sizes?.meta === 'object' &&
    'url' in doc.meta.metadata.image.sizes.meta
      ? process.env.S3_ENABLED === 'true'
        ? doc.meta.metadata.image.sizes.meta.url
        : `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.metadata.image.url}`
      : '/golf-hero.jpg'

  const title = doc?.meta?.metadata?.title
    ? doc.meta.metadata.title + ' | CVX Junior Golf'
    : 'CVX Junior Golf'

  return {
    description: doc?.meta?.metadata?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.metadata?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
