import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req }) => {
  const { payload } = req

  payload.logger.info(`Revalidating header`)

  if (req.headers['X-Payload-Migration'] !== 'true') {
    revalidatePath('/(payload)', 'layout')
    revalidatePath('/(frontend)', 'layout')
  }

  return doc
}
