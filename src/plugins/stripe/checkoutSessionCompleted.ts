import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'
import { APIError } from 'payload'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  const { id: sessionId, metadata, amount_total, payment_status } = event.data.object
  const registrationIds = metadata?.registrationIds?.split(',') || []

  payload.logger.info(`🪝 Processing checkout session completed for session ID: ${sessionId}`)

  if (registrationIds.length === 0) {
    throw new APIError('No registrationIds found in checkout session metadata')
  }

  // Filter out empty strings and validate IDs
  const validRegistrationIds = registrationIds.filter((id) => id && id.trim() !== '')

  if (validRegistrationIds.length === 0) {
    throw new APIError('No valid registrationIds found in checkout session metadata')
  }

  if (payment_status === 'paid') {
    try {
      await payload.update({
        collection: 'registrations-v2',
        where: {
          id: {
            in: validRegistrationIds, // Pass the array directly, not joined string
          },
        },
        data: {
          paid: true,
        },
      })
    } catch (error) {
      throw new APIError(`Error updating registrations: ${error}`)
    }

    try {
      const { docs: paidRegistrations } = await payload.find({
        collection: 'registrations-v2',
        where: {
          id: {
            in: validRegistrationIds, // Same fix here
          },
        },
      })

      if (!paidRegistrations || paidRegistrations.length === 0) {
        payload.logger.warn('No paid registrations found. Skipping email.')
        return
      }

      const playerNames = paidRegistrations
        .map((reg) => `${reg.fullName}`)
        .join(', ')

      const { docs: forms } = await payload.find({
        collection: 'forms',
        where: {
          title: {
            equals: 'Register',
          },
        },
        limit: 1,
      })

      if (!forms || forms.length === 0) {
        payload.logger.warn("No 'Register' form found. Skipping email notification.")
        return
      }

      const form = forms[0]
      const { emails } = form || {}

      if (!emails || emails.length === 0) {
        payload.logger.warn(`No email recipients configured for the \'Register\' form.`)
        return
      }

      for (const email of emails) {
        await payload.sendEmail({
          to: email.emailTo,
          cc: email.cc,
          bcc: email.bcc,
          replyTo: email.replyTo,
          from: email.emailFrom,
          subject: `Payment Confirmed for ${playerNames}`,
          html: `
            <h2>Payment Confirmation</h2>
            <p>A payment has been successfully processed for the following players: ${playerNames}</p>
            <hr/>
            <h3>Payment Details:</h3>
            <ul>
              <li>Amount: $${amount_total ? (amount_total / 100).toFixed(2) : '0.00'}</li>
              <li>Status: ${payment_status}</li>
              <li>Stripe Session ID: ${sessionId}</li>
            </ul>
            <hr/>
            <p><small>This is an automated message.</small></p>
          `,
        })
      }
    } catch (error) {
      throw new APIError(`Error sending email: ${error}`)
    }
  }
}
