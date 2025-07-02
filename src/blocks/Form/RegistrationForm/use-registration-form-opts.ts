'use client'

import { formOptions, FormOptions } from '@tanstack/react-form'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import { Form } from '@/payload-types'
import { Dispatch, SetStateAction } from 'react'
import { PostError } from '../Component'

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

export const useRegistrationFormOpts = ({
  payloadForm,
  setPostError,
}: {
  payloadForm: Form | string
  setPostError: Dispatch<SetStateAction<PostError | undefined>>
}) => {
  const router = useRouter()
  return formOptions({
    defaultValues: {
      parents: [{ firstName: '', lastName: '', phone: '', postalCode: '', email: '' }],
      players: [{ firstName: '', lastName: '', gender: '', ethnicity: '', dob: undefined }],
      price: 75,
    },
    onSubmit: async ({ value: data }) => {
      setPostError(undefined)
      try {
        // 1. Submit to form-submissions
        const submissionRes = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: 'registration',
            data: { parents: data.parents, players: data.players, price: data.price },
            payment: { amount: data.price, status: 'pending' },
          }),
        })
        const submission = await submissionRes.json()
        if (!submission?.doc?.id) throw new Error('Submission failed')
        // 2. Add to registrations
        const regRes = await fetch(`${getClientSideURL()}/api/registrations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data.players[0],
            ...data.parents[0],
            childBirthdate: data.players[0]?.dob,
            postalCode: data.parents[0]?.postalCode,
            paid: false,
          }),
        })
        if (!regRes.ok) throw new Error('Registration failed')
        // 3. Stripe checkout
        if (data.price > 0) {
          const sessionRes = await fetch(`${getClientSideURL()}/api/stripe/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              submissionId: submission.doc.id,
              price: data.price,
            }),
          })
          const session = await sessionRes.json()
          if (session?.url) {
            window.location.href = session.url
            return
          } else {
            throw new Error('Stripe session failed')
          }
        }
      } catch (err: any) {
        setPostError(err.message || 'Unknown error')
      }
    },
  }) as FormOptions<RegistrationFormType, any, any, any, any, any, any, any, any, any>
}
