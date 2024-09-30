import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  console.log('checkoutSessionCompleted handler called')

  const { id: sessionId, metadata, amount_total } = event.data.object
  const submissionId = metadata?.submissionId
  console.log('Amount total', amount_total)

  if (!submissionId) {
    payload.logger.error('No submissionId found in checkout session metadata')
    return
  }
  try {
    await payload.update({
      collection: 'form-submissions',
      id: submissionId,
      overrideAccess: true,
      data: {
        status: 'paid',
        amount: ((amount_total ?? 0) / 100).toString(),
      },
    })

    payload.logger.info(
      `Successfully updated form submission ${submissionId} for checkout session ${sessionId}`,
    )
  } catch (error) {
    payload.logger.error(`Error updating form submission: ${error}`)
  }
}
