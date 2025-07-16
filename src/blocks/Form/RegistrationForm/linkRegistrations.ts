'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const linkRegistrations = async (registrationIds: string[]) => {
  const payload = await getPayload({config: configPromise})

  try {
    for (const id of registrationIds) {
      const otherRegistrationIds = registrationIds.filter((currentId) => currentId !== id)
      await payload.update({
        collection: 'registrations-v2',
        id,
        data: {
          relatedRegistrations: otherRegistrationIds,
        },
      })
    }
    return { success: true }
  } catch (error) {
    console.error('Error linking registrations:', error)
    return { success: false, error: error.message }
  }
}
