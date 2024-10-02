'use server'

import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  //@ts-ignore
  apiVersion: '2022-08-01',
})

export const createCheckoutSession = async (submissionId: number, eventId: number) => {
  const payload = await getPayload({ config: payloadConfig })

  const { title, price } = await payload.findByID({
    collection: 'events',
    id: eventId,
  })

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cancel`,

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title,
            },
            unit_amount: (price ?? 0) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        submissionId: submissionId,
      },
    })

    if (session.url) {
      return { url: session.url }
    }
  } catch (error: unknown) {
    return { error: 'Failed to create checkout session' }
  }
}
