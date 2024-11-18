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
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        // Flatten nested arrays and objects into key-value pairs
        const flattenedData = Object.entries(data).reduce((acc: any[], [key, value]) => {
          if (Array.isArray(value)) {
            // Get the singular form by removing 's' from plural
            const singularKey = key.endsWith('s') ? key.slice(0, -1) : key

            // For arrays, create separate entries for each item
            value.forEach((item, index) => {
              if (typeof item === 'object') {
                Object.entries(item).forEach(([itemKey, itemValue]) => {
                  acc.push({
                    field: `${singularKey}_${index + 1}_${itemKey}`,
                    value: String(itemValue),
                  })
                })
              } else {
                acc.push({
                  field: `${singularKey}_${index + 1}`,
                  value: String(item),
                })
              }
            })
          } else if (typeof value === 'object' && value !== null) {
            // For objects, create separate entries for each property
            Object.entries(value).forEach(([objKey, objValue]) => {
              acc.push({
                field: `${key}_${objKey}`,
                value: String(objValue),
              })
            })
          } else {
            // For simple values
            acc.push({
              field: key,
              value: String(value),
            })
          }
          return acc
        }, [])

        try {
          const req = await fetch(`${baseUrl}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: flattenedData,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          const { doc: formSubmission } = res
          const submissionId: string = formSubmission.id

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

          if (data.Price && Number(data.Price) > 0) {
            console.log('Creating checkout session with:', {
              submissionId,
              price: data.Price,
            })
            const session = await createCheckoutSession(submissionId, Number(data.Price))
            console.log('Checkout session response:', session)
            if (session?.url) {
              router.push(session.url)
            } else {
              console.error('Checkout session error:', session?.error)
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
      }

      void submitForm()
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
