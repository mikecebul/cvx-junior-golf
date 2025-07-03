'use client'

import { formOptions, FormOptions } from '@tanstack/react-form'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import { Form } from '@/payload-types'
import { Dispatch, SetStateAction } from 'react'
import { PostError } from '../Component'
import { z } from 'zod'
import { format } from 'date-fns'

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
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({ form: formId, data: { ...data, players: formattedPlayers } }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        })
        const res = await req.json()
        if (req.status >= 400) {
          setPostError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })
          return
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
      } catch (err) {
        setPostError({ message: 'Something went wrong.' })
      }
    },
  })
}
