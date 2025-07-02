'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useRegistrationFormOpts } from './use-registration-form-opts'
import { PostError } from '../Component'
import { FormBlock } from '@/payload-types'
import { useAppForm } from '../hooks/form'

// Price calculation helper
const getPrice = (numPlayers: number) => {
  if (numPlayers === 1) return 75
  if (numPlayers === 2) return 125
  if (numPlayers === 3) return 150
  if (numPlayers === 4) return 175
  return 0
}

export const RegistrationForm = ({ form: payloadForm, enableIntro, introContent }: FormBlock) => {
  const { confirmationMessage, confirmationType } =
    typeof payloadForm === 'object' ? payloadForm : {}

  const [postError, setPostError] = useState<PostError | undefined>()

  // Use form options from custom hook
  const formOpts = useRegistrationFormOpts({
    payloadForm,
    setPostError,
  })
  const form = useAppForm({ ...formOpts })

  // Price
  const price = form.state.values.players ? getPrice(form.state.values.players.length) : 75

  return (
    <Card className="mx-auto max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-8"
      >
        <CardContent className="space-y-8">
          <h2 className="text-2xl font-bold">Registration Form</h2>
          {/* Parents */}
          <div>
            <h3 className="mb-2 font-semibold">Parent(s)</h3>
            <form.AppField name="parents" mode="array">
              {(field) => (
                <>
                  {field.state.value.map((_, idx) => (
                    <Card key={idx} className="relative mb-2 rounded-md border p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <form.AppField name={`parents[${idx}].firstName`}>
                          {(subField) => (
                            <subField.TextField label="First Name" colSpan="2" required />
                          )}
                        </form.AppField>
                        <form.AppField name={`parents[${idx}].lastName`}>
                          {(subField) => <subField.TextField label="Last Name" required />}
                        </form.AppField>
                        <form.AppField name={`parents[${idx}].phone`}>
                          {(subField) => <subField.PhoneField label="Phone" required />}
                        </form.AppField>
                        <form.AppField name={`parents[${idx}].postalCode`}>
                          {(subField) => <subField.TextField label="Postal Code" required />}
                        </form.AppField>
                        <form.AppField name={`parents[${idx}].email`}>
                          {(subField) => <subField.EmailField label="Email" required />}
                        </form.AppField>
                      </div>
                      {field.state.value.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => field.removeValue(idx)}
                        >
                          Remove
                        </Button>
                      )}
                    </Card>
                  ))}
                  {field.state.value.length < 2 && (
                    <Button
                      type="button"
                      onClick={() =>
                        field.pushValue({
                          firstName: '',
                          lastName: '',
                          phone: '',
                          postalCode: '',
                          email: '',
                        })
                      }
                      variant="outline"
                    >
                      Add Parent
                    </Button>
                  )}
                </>
              )}
            </form.AppField>
          </div>
          {/* Players */}
          <div>
            <h3 className="mb-2 font-semibold">Player(s)</h3>
            <form.AppField name="players" mode="array">
              {(field) => (
                <>
                  {field.state.value.map((_, idx) => (
                    <Card key={idx} className="relative mb-2 rounded-md border p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <form.AppField name={`players[${idx}].firstName`}>
                          {(subField) => <subField.TextField label="First Name" required />}
                        </form.AppField>
                        <form.AppField name={`players[${idx}].lastName`}>
                          {(subField) => <subField.TextField label="Last Name" required />}
                        </form.AppField>
                        <form.AppField name={`players[${idx}].gender`}>
                          {(subField) => <subField.TextField label="Gender" required />}
                        </form.AppField>
                        <form.AppField name={`players[${idx}].ethnicity`}>
                          {(subField) => <subField.TextField label="Ethnicity" />}
                        </form.AppField>
                        <form.AppField name={`players[${idx}].dob`}>
                          {(subField) => <subField.DobField label="Date of Birth" required />}
                        </form.AppField>
                      </div>
                      {field.state.value.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => field.removeValue(idx)}
                        >
                          Remove
                        </Button>
                      )}
                    </Card>
                  ))}
                  {field.state.value.length < 4 && (
                    <Button
                      type="button"
                      onClick={() =>
                        field.pushValue({
                          firstName: '',
                          lastName: '',
                          gender: '',
                          ethnicity: '',
                          dob: undefined,
                        })
                      }
                      variant="outline"
                    >
                      Add Player
                    </Button>
                  )}
                </>
              )}
            </form.AppField>
          </div>
          {/* Price */}
          <div className="text-lg font-semibold">Total: ${price}</div>
          {/* Error/Success */}
          {postError && <div className="text-red-600">{postError.message}</div>}
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <form.AppForm>
            <form.SubmitButton label={form.state.isSubmitting ? 'Submitting...' : 'Submit & Pay'} />
          </form.AppForm>
        </CardFooter>
      </form>
    </Card>
  )
}
