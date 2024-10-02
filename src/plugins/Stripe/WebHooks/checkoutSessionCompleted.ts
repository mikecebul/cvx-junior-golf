import payloadConfig from '@payload-config'
import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import { getPayload } from 'payload'
import type Stripe from 'stripe'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event }) => {
  const payload = await getPayload({ config: payloadConfig })

  try {
    const { id: sessionId, metadata, amount_total } = event.data.object
    const submissionId = metadata?.submissionId

    if (!submissionId) {
      payload.logger.error('No submissionId found')
      return
    }

    await payload.update({
      collection: 'form-submissions',
      id: submissionId,
      data: {
        status: 'paid',
        amount: `$${(amount_total ?? 0) / 100}`,
      },
    })

    payload.logger.info(
      `Successfully updated form submission ${submissionId} for checkout session ${sessionId}`,
    )
  } catch (error) {
    payload.logger.error(`Error updating form submission: ${error}`)
  }
}
