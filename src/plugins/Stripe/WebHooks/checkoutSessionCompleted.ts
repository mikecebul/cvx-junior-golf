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
    const testFind = await payload.find({
      collection: 'events',
      depth: 1,
      overrideAccess: true,
    })

    payload.logger.info(`Payload find ran: ${JSON.stringify(testFind)}`)
  } catch (error) {
    payload.logger.error(`Webhook Error using localAPI: ${error}`)
  }
}
