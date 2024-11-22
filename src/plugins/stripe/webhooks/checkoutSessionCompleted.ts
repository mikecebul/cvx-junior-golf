import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'
import { APIError } from 'payload'
import { serializeLexical } from './lexical/serializeLexical'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  const { id: sessionId, metadata, amount_total, payment_status } = event.data.object
  const submissionId = metadata?.submissionId

  payload.logger.info(`🪝 Processing checkout session completed for session ID: ${sessionId}`)

  if (!submissionId) {
    throw new APIError('No submissionId found in checkout session metadata')
  }

  if (payment_status === 'paid') {
    try {
      const submission = await payload.findByID({
        collection: 'registrations',
        id: submissionId,
      })

      const enhancedSubmissionData = {
        ...JSON.parse(JSON.stringify(submission.formData)),
        paymentStatus: payment_status,
        amount: amount_total ? `$${(amount_total / 100).toFixed(2)}` : '$0.00',
      }

      await sendPaymentConfirmationEmail({
        submission,
        enhancedSubmissionData,
        payment_status,
        payload,
      })
    } catch (error) {
      throw new APIError(`Error sending confirmation email: ${error}`)
    }
  }
}

async function sendPaymentConfirmationEmail({
  submission,
  enhancedSubmissionData,
  payment_status,
  payload,
}) {
  const message = {
    root: {
      children: [
        {
          children: [
            {
              text:
                payment_status === 'paid'
                  ? '✅ Payment Successfully Processed!'
                  : '❌ Payment Failed',
              version: 1,
            },
          ],
          type: 'p',
          version: 1,
        },
      ],
      direction: null,
      format: 'left' as const,
      indent: 0,
      type: 'root',
      version: 1,
    },
  }

  const html = await serializeLexical(message, enhancedSubmissionData)
  const form = await payload.findByID({
    id: typeof submission.form === 'string' ? submission.form : submission.form.id,
    collection: 'forms',
  })

  if (form.emails?.length) {
    const firstEmail = form.emails[0]
    await payload.sendEmail({
      to: firstEmail.emailTo,
      cc: firstEmail.cc,
      bcc: firstEmail.bcc,
      replyTo: firstEmail.replyTo,
      from: firstEmail.emailFrom,
      subject: payment_status === 'paid' ? 'Payment Confirmed' : 'Payment Failed',
      html,
    })
  }
}
