import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

    req.headers['X-Payload-Migration'] !== 'true' && revalidatePath(path)
    req.payload.logger.info(`Revalidating page at path: ${path}`)
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

    req.headers['X-Payload-Migration'] !== 'true' && revalidatePath(oldPath)
    req.payload.logger.info(`Revalidating old page at path: ${oldPath}`)
  }

  return doc
}
