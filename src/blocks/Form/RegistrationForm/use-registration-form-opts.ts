'use client'

import { formOptions } from '@tanstack/react-form'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import { Form } from '@/payload-types'
import { Dispatch, SetStateAction } from 'react'
import { PostError } from '../Component'
import { z } from 'zod'
import { format } from 'date-fns'
import { createCheckoutSession } from '@/plugins/stripe/createCheckoutSession'
import { linkRegistrations } from './linkRegistrations'

export type RegistrationFormType = {
  parents: {
    firstName: string
    lastName: string
    phone: string
    postalCode: string
    email: string
  }[]
  players: {
    firstName: string
    lastName: string
    gender: string
    ethnicity: string
    dob: Date | undefined
  }[]
  price: number
}

const parentSchema = z.object({
  firstName: z.string().min(1, 'Parent first name is required'),
  lastName: z.string().min(1, 'Parent last name is required'),
  phone: z
    .string()
    .min(1, 'Parent phone is required')
    .regex(
      /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Invalid phone number',
    ),
  postalCode: z.string().min(1, 'Postal code is required'),
  email: z.string().min(1, 'Parent email is required').email('Invalid email'),
})

const playerSchema = z.object({
  firstName: z.string().min(1, 'Player first name is required'),
  lastName: z.string().min(1, 'Player last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  ethnicity: z.string().min(1, 'Ethnicity is required'),
  dob: z
    .date({ required_error: 'Date of birth is required' })
    .max(new Date(), { message: 'Date of birth cannot be in the future!' }),
})

const registrationSchema = z.object({
  parents: z.array(parentSchema).min(1, 'At least one parent is required'),
  players: z.array(playerSchema).min(1, 'At least one player is required'),
  price: z.number().min(0, 'Price must be at least 0'),
})

export const useRegistrationFormOpts = ({
  payloadForm,
  setPostError,
}: {
  payloadForm: Form | string
  setPostError: Dispatch<SetStateAction<PostError | undefined>>
}) => {
  const router = useRouter()
  const {
    confirmationType,
    id: formId,
    redirect,
  } = typeof payloadForm !== 'string' ? payloadForm : {}

  return formOptions({
    defaultValues: {
      parents: [{ firstName: '', lastName: '', phone: '', postalCode: '', email: '' }],
      players: [{ firstName: '', lastName: '', gender: '', ethnicity: '', dob: undefined }],
      price: 75,
    },
    validators: {
      onChange: registrationSchema,
    },
    onSubmit: async ({ value: data, formApi: form }) => {
      setPostError(undefined)
      try {
        // Format dob for each player before sending
        const formattedPlayers = data.players.map((player) => ({
          ...player,
          dob: player.dob ? format(player.dob, 'MMMM d, yyyy') : undefined,
        }))

        // Prepare the request to create a form submission
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formId,
            data: { ...data, players: formattedPlayers },
          }),
        })
        const res = await req.json()
        if (req.status >= 400) {
          setPostError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })
          return
        }
        const { doc: submission } = res
        const submissionId: string = submission.id

        if (!submissionId) {
          console.error('No submission ID received from the server')
          setPostError({
            message: 'Failed to get submission ID',
            status: 'error',
          })
          return
        }

        // Prepare request to create a Registration

        const registrationIds: string[] = []
        try {
          // Option 1: Sequential processing (safer for rate limits)
          for (const player of data.players) {
            const response = await fetch(`${getClientSideURL()}/api/registrations-v2`, {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                year: '2025',
                firstName: player.firstName,
                lastName: player.lastName,
                dob: player.dob,
                ethnicity: player.ethnicity,
                gender: player.gender,
                parents: data.parents.map((parent) => ({
                  firstName: parent.firstName,
                  lastName: parent.lastName,
                  phone: parent.phone,
                  email: parent.email,
                  postalCode: parent.postalCode,
                })),
                paid: false,
              }),
            })

            if (!response.ok) {
              const errorData = await response.json()
              console.error('Error creating registration:', errorData)
              throw new Error(
                `Registration failed for ${player.firstName} ${player.lastName}: ${
                  errorData.message || response.statusText
                }`,
              )
            }
            // Collect registration IDs
            const res = await response.json()
            const { doc: submission } = res
            const submissionId: string = submission.id
            registrationIds.push(submissionId)

            if (!submissionId) {
              console.error('No submission ID received from the server')
              setPostError({
                message: 'Failed to get submission ID',
                status: 'error',
              })
              return
            }
          }
        } catch (error) {
          console.error('Error creating registration:', error)
          setPostError({
            message: error.message || 'Failed to create registration',
            status: 'error',
          })
          return
        }

        // Use action to update related registrations
        try {
          const { success, error } = await linkRegistrations(registrationIds)
          if (!success) {
            console.error('Error linking registrations:', error)
            setPostError({
              message: error || 'Failed to link registrations',
              status: 'error',
            })
            return
          }
        } catch (error) {
          console.error('Error linking registrations:', error)
          setPostError({
            message: error.message || 'Failed to link registrations',
            status: 'error',
          })
          return
        }

        // Create Stripe checkout session
        try {
          console.log('Creating checkout session with:', {
            submissionId,
            price: Number(data.price),
          })
          const session = await createCheckoutSession(registrationIds, Number(data.price))

          if (!session) {
            throw new Error('No session returned from createCheckoutSession')
          }

          if (session?.url) {
            router.push(session.url)
          } else {
            console.error('Stripe session created but no URL returned:', session)
            setPostError({
              message: 'Failed to create checkout URL',
              status: 'error',
            })
          }
        } catch (err) {
          console.error('Stripe checkout session creation failed:', err)
          setPostError({
            message: 'Failed to create payment session. Please try again.',
            status: '500',
          })
        }

        if (confirmationType === 'redirect' && redirect) {
          if (redirect.url) router.push(redirect.url)
          if (
            typeof redirect.reference !== 'string' &&
            typeof redirect.reference?.value !== 'string' &&
            redirect.reference?.value.slug
          ) {
            router.push(redirect.reference.value.slug)
          }
        }
        form.reset()
        form.setFieldValue('price', 75) // Reset price to default
      } catch (err) {
        setPostError({ message: 'Something went wrong.' })
      }
    },
  })
}
