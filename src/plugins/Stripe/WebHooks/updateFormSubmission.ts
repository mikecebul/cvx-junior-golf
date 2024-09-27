import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  const { id: sessionId, metadata } = event.data.object

  const formSubmissionId = metadata?.formSubmissionId

  if (!formSubmissionId) {
    payload.logger.error('No formSubmissionId found in checkout session metadata')
    return
  }
  try {
    await payload.update({
      collection: 'form-submissions',
      id: formSubmissionId,
      overrideAccess: true,
      data: {
        submissionData: [
          { field: 'paymentStatus', value: 'paid' },
          { field: 'checkoutSessionId', value: sessionId },
        ],
      },
    })

    payload.logger.info(`Successfully updated form submission ${formSubmissionId} for checkout session ${sessionId}`)
  } catch (error) {
    payload.logger.error(`Error updating form submission: ${error}`)
  }
}