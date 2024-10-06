'use server'

import Stripe from 'stripe'
import { baseUrl } from './utilities/baseUrl'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  //@ts-ignore
  apiVersion: '2022-08-01',
})

export const createCheckoutSession = async (submissionId: string, eventPrice: number) => {
  if (!submissionId) {
    throw new Error('No submission ID provided')
  }

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Product',
            },
            unit_amount: eventPrice * 100,
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
