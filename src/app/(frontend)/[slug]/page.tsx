import type { Metadata } from 'next'

import React, { cache } from 'react'
import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'

import type { Page as PageType } from '@/payload-types'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = page

  return (
    <main>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
