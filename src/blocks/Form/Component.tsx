'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import Container from '@/components/Container'
import { createCheckoutSession } from '@/plugins/stripe/action'
import { baseUrl } from '@/utilities/baseUrl'
import { Card } from '@/components/ui/card'
import { format } from 'date-fns'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  parents: Array<{
    firstName: string
    lastName: string
    [key: string]: any
  }>
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: {
    [k: string]: unknown
  }[]
}

interface FormData {
  parents: Array<{
    firstName: string
    lastName: string
    [key: string]: any
  }>
  [key: string]: any
}

export const FormBlock: React.FC<
  {
    id?: string
    nested?: boolean
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    nested = false,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: Data) => {
      setError(undefined)
      setIsLoading(true)

      const submissionData = Object.entries(data)
        .filter(([name]) => !['price', 'paymentStatus'].includes(name))
        .reduce(
          (acc, [name, value]) => ({
            ...acc,
            [name]: value,
          }),
          {} as FormData,
        )

      try {
        const title =
          data.parents?.[0]?.firstName && data.parents[0]?.lastName
            ? `${data.parents[0].firstName} ${data.parents[0].lastName}`
            : `CVX Jr Golf Registration - ${format(new Date(), 'MMMM d, yyyy')}`

        const req = await fetch(`${baseUrl}/api/form-submissions`, {
          body: JSON.stringify({
            title,
            form: formID,
            submissionData,
            payment: {
              amount: data.price,
              status: 'pending',
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (req.status >= 400) {
          setIsLoading(false)
          setError({
            message:
              res.errors?.[0]?.message || 'Internal Server Error | failed to create submission',
            status: req.status.toString(),
          })
          return
        }

        const { doc: submission } = res
        const submissionId: string = submission.id

        if (!submissionId) {
          console.error('No submission ID received from the server')
          setError({
            message: 'Failed to get submission ID',
            status: 'error',
          })
          return
        }

        setIsLoading(false)
        setHasSubmitted(true)

        if (data.price && Number(data.price) > 0) {
          try {
            console.log('Creating checkout session with:', {
              submissionId,
              price: Number(data.price),
            })
            const session = await createCheckoutSession(submissionId, Number(data.price))

            if (!session) {
              throw new Error('No session returned from createCheckoutSession')
            }

            if (session?.url) {
              router.push(session.url)
            } else {
              console.error('Stripe session created but no URL returned:', session)
              setError({
                message: 'Failed to create checkout URL',
                status: 'error',
              })
            }
          } catch (err) {
            console.error('Stripe checkout session creation failed:', err)
            setError({
              message: 'Failed to create payment session. Please try again.',
              status: '500',
            })
          }
        } else {
          if (confirmationType === 'redirect' && redirect) {
            const { url: redirectUrl } = redirect
            if (redirectUrl) router.push(redirectUrl)
          }
        }
      } catch (err) {
        console.warn(err)
        setIsLoading(false)
        setError({
          message: 'Something went wrong.',
        })
      }
    },
    [router, formID, redirect, confirmationType],
  )

  const content = (
    <FormProvider {...formMethods}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8" content={introContent} enableGutter={false} />
      )}
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <RichText content={confirmationMessage} />
      )}
      {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
      {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
      {!hasSubmitted && (
        <form id={formID} onSubmit={handleSubmit(onSubmit)}>
          <Card className="flex flex-wrap gap-4 p-4">
            {formFromProps &&
              formFromProps.fields?.map((field: FormFieldBlock, index) => {
                const Field: React.FC<any> = fields?.[field.blockType]
                if (Field) {
                  return (
                    <div className="w-full" key={index}>
                      <Field
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    </div>
                  )
                }
                return null
              })}
            <Button form={formID} type="submit" variant="brand" className="w-full">
              {submitButtonLabel}
            </Button>
          </Card>
        </form>
      )}
    </FormProvider>
  )

  if (nested) {
    return <div className="">{content}</div>
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl">{content}</div>
    </Container>
  )
}
