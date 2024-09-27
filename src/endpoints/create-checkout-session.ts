import type { PayloadHandler } from 'payload'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-08-01',
})
export const createCheckoutSession: PayloadHandler = async (req) => {
  const { payload } = req

  if (!req.json) {
    throw new Error('Request body is empty')
  }

  const { form } = await req.json()
  console.log('submissionID', form)

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,


      line_items: [
        {
          price: 'price_1Q3jgDIq6qksX8CT8pcjZuOd',
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        submissionID: form,
      },
    });

    return Response.json({ url: session.url }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 401 })
  }
}
