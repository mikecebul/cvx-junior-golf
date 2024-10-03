'use server'

import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  try {
    const { metadata, amount_total } = event.data.object
    const submissionId = metadata?.submissionId

    if (!submissionId) {
      payload.logger.error('No submissionId found')
      return
    }

    const updatedSubmission = await payload.update({
      collection: 'form-submissions',
      id: submissionId,
      data: {
        status: 'paid',
        // amount: ((amount_total ?? 0) / 100).toString(),
      },
    })

    payload.logger.info(`Updated form submission: ${JSON.stringify(updatedSubmission)}`)
  } catch (error) {
    payload.logger.error(`Webhook Error updating form submission: ${error}`)
  }
}
