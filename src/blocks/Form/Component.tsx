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

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
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

// Add this interface above the FormBlock component
interface FormValues {
  numberOfChildren: string
  [key: string]: any
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
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm<FormValues>({
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

      const formData = Object.entries(data)
        .filter(([name]) => !['price', 'paymentStatus'].includes(name))
        .reduce(
          (acc, [name, value]) => ({
            ...acc,
            [name]: value,
          }),
          {} as FormData,
        )

      try {
        const req = await fetch(`${baseUrl}/api/form-submissions`, {
          body: JSON.stringify({
            title: `${formData.parents[0].firstName} ${formData.parents[0].lastName}`,
            form: formID,
            formData,
            price: data.price,
            paymentStatus: 'pending',
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
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: req.status.toString(),
          })
          return
        }

        const { doc: registration } = res
        const registrationId: string = registration.id

        if (!registrationId) {
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
          console.log('Creating checkout session')
          const session = await createCheckoutSession(registrationId, Number(data.price))
          if (session?.url) {
            router.push(session.url)
          } else {
            setError({
              message: session?.error || 'Failed to create checkout session',
              status: 'error',
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

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
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
              <Card className="p-4 flex flex-wrap gap-4">
                {formFromProps &&
                  formFromProps.fields?.map((field: FormFieldBlock, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType]
                    if (Field) {
                      return (
                        <div
                          className={`last:mb-0 ${'width' in field && field.width === 100 ? 'w-full' : 'basis-[calc(50%-0.5rem)]'}`}
                          key={index}
                        >
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
                <Button form={formID} type="submit" variant="default" className="w-full">
                  {submitButtonLabel}
                </Button>
              </Card>
            </form>
          )}
        </FormProvider>
      </div>
    </Container>
  )
}
