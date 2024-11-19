import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'
import { APIError } from 'payload'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  const { id: sessionId, metadata, amount_total } = event.data.object
  const submissionId = metadata?.submissionId

  payload.logger.info(
    `🪝 Processing checkout session completed for session ID: ${sessionId}`,
  )

  if (!submissionId) {
    throw new APIError('No submissionId found in checkout session metadata')
  }

  try {
    payload.logger.info(
      `- Updating form submission ${submissionId} with payment status`,
    )

    await payload.update({
      collection: 'form-submissions',
      id: submissionId,
      overrideAccess: true,
      data: {
        paymentStatus: 'paid',
        amount: amount_total ? `$${(amount_total / 100).toFixed(2)}` : '$0.00',
      },
    })

    payload.logger.info(
      `✅ Successfully updated form submission ${submissionId} for checkout session ${sessionId}`,
    )
  } catch (error) {
    throw new APIError(`Error updating form submission: ${error}`)
  }
}
