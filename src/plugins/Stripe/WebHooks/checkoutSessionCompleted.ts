import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  payload.logger.info('checkoutSessionCompleted handler called')

  try {
    payload.logger.info('About to destructure event.data.object')
    const { id: sessionId, metadata, amount_total } = event.data.object
    payload.logger.info('Destructuring successful')

    payload.logger.info('Checking submissionId')
    const submissionId = metadata?.submissionId

    if (!submissionId) {
      payload.logger.info('No submissionId found')
      payload.logger.error('No submissionId found in checkout session metadata')
      return
    }

    payload.logger.info(`submissionId found: ${submissionId}`)
    payload.logger.info('Try catch initiated')

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

    payload.logger.info('Payload form update result:', updateResult)

    payload.logger.info(
      `Successfully updated form submission ${numericSubmissionId} for checkout session ${sessionId}`,
    )
  } catch (error) {
    payload.logger.error('Error in checkoutSessionCompleted:', error)
    payload.logger.error(`Error updating form submission: ${error}`)
    payload.logger.error('Error stack:', error.stack)
  }
}
