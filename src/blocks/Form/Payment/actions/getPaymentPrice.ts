'use server'

import { getPaymentTotal } from '@payloadcms/plugin-form-builder'

export async function getPaymentPrice({
  basePrice,
  priceConditions,
  fieldValues,
}: {
  basePrice: number
  priceConditions: any // Update this type based on your actual price conditions type
  fieldValues: Record<string, any>
}) {
  return getPaymentTotal({
    basePrice,
    priceConditions,
    fieldValues,
  })
}