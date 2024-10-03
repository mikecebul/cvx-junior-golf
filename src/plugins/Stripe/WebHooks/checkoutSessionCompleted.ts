'use server'

import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  payload.logger.info(`Webhook ran: ${JSON.stringify(event)}`)
  try {
    // const { metadata, amount_total } = event.data.object
    // const submissionId = metadata?.submissionId

    // if (!submissionId) {
    //   payload.logger.error('No submissionId found')
    //   return
    // }

    // const updatedSubmission = await payload.update({
    //   collection: 'form-submissions',
    //   id: submissionId,
    //   data: {
    //     status: 'paid',
    //     // amount: ((amount_total ?? 0) / 100).toString(),
    //   },
    // })
    const testFind = await payload.find({
      collection: 'events',
      depth: 1,
      limit: 1,
      page: 1,
      sort: 'createdAt',
      overrideAccess: true,
    })

    // payload.logger.info(`Updated form submission: ${JSON.stringify(updatedSubmission)}`)
    payload.logger.info(`Payload find ran: ${JSON.stringify(testFind)}`)
  } catch (error) {
    payload.logger.error(`Webhook Error updating form submission: ${error}`)
  }
}
