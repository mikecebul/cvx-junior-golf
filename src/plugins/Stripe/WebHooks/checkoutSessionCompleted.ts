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

  if (!submissionId) {
    payload.logger.error('No submissionId found in checkout session metadata')
    return
  }

  try {
    const numericSubmissionId = parseInt(submissionId, 10)

    if (isNaN(numericSubmissionId)) {
      throw new Error('Invalid submissionId: not a number')
    }

    const updateResult = await payload.update({
      collection: 'form-submissions',
      id: numericSubmissionId, // Use the converted numeric ID
      overrideAccess: true,
      data: {
        status: 'paid',
        amount: ((amount_total ?? 0) / 100).toString(),
      },
    })

    if (!updateResult) {
      payload.logger.error(`Failed to update form submission ${numericSubmissionId}`)
    }

    payload.logger.info(
      `Successfully updated form submission ${numericSubmissionId} for checkout session ${sessionId}`,
    )
  } catch (error) {
    payload.logger.error(`Error updating form submission: ${error}`)
  }
}
