// import type { PayloadHandler, PayloadRe } from 'payload'
// import { addDataAndFileToRequest } from '@payloadcms/next/utilities'

// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//   apiVersion: '2022-08-01',
// })
// export const createCheckoutSession: PayloadHandler = async (req) => {
//   const { payload, user } = req

//   await addDataAndFileToRequest({ request: req })
//   console.log({ data: (req as PayloadRequestWithData).data })
//   const submissionId = (req as PayloadRequestWithData).data?.cart

//   try {

//     return Response.json({ url: session.url }, { status: 200 })
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error'
//     payload.logger.error(message)
//     return Response.json({ error: message }, { status: 401 })
//   }
// }
