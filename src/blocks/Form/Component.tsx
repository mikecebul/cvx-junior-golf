'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import Container from '@/components/Container'
import { createCheckoutSession } from '@/plugins/stripe/action'
import { baseUrl } from '@/utilities/baseUrl'

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
  numberOfChildren: string;
  [key: string]: any;
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
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

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${baseUrl}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
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

          if (!!data.price) {
            const session = await createCheckoutSession(submissionId)
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
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const generateChildFields = useCallback((numberOfChildren: number, originalFields: any[]) => {
    const childFields = originalFields.filter(field =>
      field.blockType === 'text' &&
      (field.name?.startsWith('child') || field.label?.startsWith('Child'))
    );

    const newFields = [...originalFields];
    const childFieldsIndex = newFields.findIndex(field => field.name?.startsWith('child'));

    // Remove original child fields
    newFields.splice(childFieldsIndex, childFields.length);

    // Add numbered child fields
    for (let i = 1; i <= numberOfChildren; i++) {
      childFields.forEach(field => {
        const newField = {
          ...field,
          name: `${field.name}_${i}`,
          label: `${field.label} (Child ${i})`,
        };
        newFields.splice(childFieldsIndex, 0, newField);
      });
    }

    return newFields;
  }, []);

  // Get numberOfChildren field value from form data
  const numberOfChildrenField = formFromProps?.fields?.find(
    field => field.blockName === 'numberOfChildren'
  );

  const numberOfChildren = formMethods.watch('numberOfChildren');

  // Add useEffect to react to numberOfChildren changes
  const [currentFields, setCurrentFields] = useState(formFromProps.fields);

  useEffect(() => {
    if (numberOfChildrenField) {
      const newFields = generateChildFields(Number(numberOfChildren) || 0, formFromProps.fields);
      setCurrentFields(newFields);
    }
  }, [numberOfChildren, formFromProps.fields, generateChildFields, numberOfChildrenField]);

  return (
    <Container>
      <div className="max-w-lg mx-auto">
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
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  currentFields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
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
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </Container>
  )
}
