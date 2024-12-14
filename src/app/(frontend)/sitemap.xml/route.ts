import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { baseUrl } from '@/utilities/baseUrl'
import { unstable_cache } from 'next/cache'

const getSitemap = unstable_cache(
  async () => {
    if (process.env.NEXT_PUBLIC_IS_LIVE === 'false') {
      return []
    }

    const payload = await getPayload({ config: configPromise })
    const { docs: pages } = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: true,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = pages
      .filter((page) => Boolean(page.slug))
      .map((page) => ({
        loc: `${baseUrl}${page.slug === 'home' ? '' : `/${page.slug}`}`,
        lastmod: page.updatedAt || dateFallback,
      }))

    return sitemap
  },
  ['sitemap'],
  {
    tags: ['sitemap'],
  },
)

export async function GET() {
  const sitemap = await getSitemap()

  return getServerSideSitemap(sitemap)
}
