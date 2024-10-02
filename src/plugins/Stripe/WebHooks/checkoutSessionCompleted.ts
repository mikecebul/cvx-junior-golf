import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {

  try {
    const { id: sessionId, metadata, amount_total } = event.data.object
    const submissionId = metadata?.submissionId

    if (!submissionId) {
      payload.logger.error('No submissionId found')
      return
    }

    const submission = await payload.findByID({
      collection: 'form-submissions',
      id: submissionId,
    })
    if (!submission) {
      payload.logger.error(`No submission found for id ${submissionId}`)
      return
    }

    const updatedSubmission = await payload.update({
      collection: 'form-submissions',
      id: submissionId,
      data: {
        status: 'paid',
        amount: `$${(amount_total ?? 0) / 100}`,
      },
    })
    if (!updatedSubmission) {
      payload.logger.error(`Error updating form submission ${submissionId} for checkout session ${sessionId}`)
      return
    }

    payload.logger.info(`Updated form submission:, ${updatedSubmission}`)
  } catch (error) {
    payload.logger.error(`Error updating form submission: ${error}`)
  }
}
