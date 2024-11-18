'use server'

import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import Stripe from 'stripe'
import { baseUrl } from '@/utilities/baseUrl'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  //@ts-ignore
  apiVersion: '2022-08-01',
})

export const createCheckoutSession = async (submissionId: string, price: number) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CVX Jr Golf Registration - 2025',
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        submissionId: submissionId,
      },
    })
    // console.log('Checkout session created:', session)
    if (session.url) {
      return { url: session.url }
    }
  } catch (error: unknown) {
    return { error: 'Failed to create checkout session' }
  }
}
