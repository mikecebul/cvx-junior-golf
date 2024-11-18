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

  console.log('Session details:', {
    sessionId,
    metadata,
    amount_total,
    submissionId,
  })

  if (!submissionId) {
    payload.logger.error('No submissionId found in checkout session metadata')
    return
  }

  try {
    const submission = await payload.findByID({
      collection: 'form-submissions',
      id: submissionId,
    })

    console.log('Found submission:', submission)

    const updateResult = await payload.update({
      collection: 'form-submissions',
      id: submissionId,
      overrideAccess: true,
      data: {
        amount: amount_total ? `$${(amount_total / 100).toFixed(2)}` : '$0.00',
        paymentStatus: 'paid',
      },
    })

    console.log('Update result:', updateResult)

    payload.logger.info(
      `Successfully updated form submission ${submissionId} for checkout session ${sessionId}`,
    )
  } catch (error) {
    payload.logger.error(`Error updating form submission: ${error}`)
    console.error('Full error details:', error)
  }
}
