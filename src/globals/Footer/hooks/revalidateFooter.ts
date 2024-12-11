import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req, }) => {
  req.payload.logger.info(`Revalidating footer`)

  if (req.headers['X-Payload-Migration'] !== 'true') {
    revalidatePath('/(payload)', 'layout')
    revalidatePath('/(frontend)', 'layout')
  }

  return doc
}
