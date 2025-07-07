'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { useRegistrationFormOpts } from './use-registration-form-opts'
import { PostError } from '../Component'
import { FormBlock } from '@/payload-types'
import { useAppForm } from '../hooks/form'
import { cn } from '@/utilities/cn'

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

  // Add price state and update it with a listener on players array
  const [price, setPrice] = useState(() => getPrice(form.getFieldValue('players')?.length || 1))

  return (
    <Card className="@container w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-8"
      >
        <CardContent className="space-y-8 pt-4">
          {/* Parents */}
          <div>
            <h3 className="mb-2 font-semibold">Parent(s)</h3>
            <form.AppField name="parents" mode="array">
              {(field) => (
                <>
                  <AnimatePresence initial={false} mode="sync">
                    {field.state.value.map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative mb-2 overflow-hidden rounded-md border p-4"
                      >
                        <div className="grid grid-cols-2 gap-4 pt-4">
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
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 size-7 rounded-full transition-opacity hover:bg-red-100"
                            onClick={() => field.removeValue(idx)}
                          >
                            <Trash2 className="size-4 text-red-700 hover:text-red-900" />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {field.state.value.length < 2 && (
                    <Button
                      type="button"
                      size="icon"
                      className={cn(
                        'size-7 rounded-full bg-green-400 transition-opacity duration-300 hover:bg-green-500',
                        {
                          'pointer-events-none h-0 opacity-0': field.state.value.length >= 2,
                          'opacity-100': field.state.value.length < 2,
                        },
                      )}
                      onClick={() =>
                        field.pushValue({
                          firstName: '',
                          lastName: '',
                          phone: '',
                          postalCode: '',
                          email: '',
                        })
                      }
                    >
                      <Plus className="h-4 w-4 text-black" />
                    </Button>
                  )}
                </>
              )}
            </form.AppField>
          </div>
          {/* Players */}
          <div>
            <h3 className="mb-2 font-semibold">Player(s)</h3>
            <form.AppField
              name="players"
              mode="array"
              listeners={{
                onChange: ({ value }) => {
                  const newPrice = getPrice(value.length)
                  setPrice(newPrice)
                  form.setFieldValue('price', newPrice)
                },
              }}
            >
              {(field) => (
                <>
                  <AnimatePresence initial={false} mode="sync">
                    {field.state.value.map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative mb-2 overflow-hidden rounded-md border p-4"
                      >
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <form.AppField name={`players[${idx}].firstName`}>
                            {(subField) => <subField.TextField label="First Name" required />}
                          </form.AppField>
                          <form.AppField name={`players[${idx}].lastName`}>
                            {(subField) => <subField.TextField label="Last Name" required />}
                          </form.AppField>
                          <form.AppField name={`players[${idx}].gender`}>
                            {(subField) => (
                              <subField.SelectField
                                label="Gender"
                                colSpan="1"
                                required
                                options={[
                                  { label: 'Male', value: 'Male' },
                                  { label: 'Female', value: 'Female' },
                                  { label: 'Prefer not to say', value: 'Prefer not to say' },
                                ]}
                              />
                            )}
                          </form.AppField>
                          <form.AppField name={`players[${idx}].ethnicity`}>
                            {(subField) => (
                              <subField.SelectField
                                label="Ethnicity"
                                required
                                colSpan="1"
                                options={[
                                  {
                                    label: 'Native American or Alaska Native',
                                    value: 'Native American or Alaska Native',
                                  },
                                  { label: 'Asian', value: 'Asian' },
                                  {
                                    label: 'Black or African American',
                                    value: 'Black or African American',
                                  },
                                  {
                                    label: 'Middle Eastern or North African',
                                    value: 'Middle Eastern or North African',
                                  },
                                  {
                                    label: 'Native Hawaiian or other Pacific Islander',
                                    value: 'Native Hawaiian or other Pacific Islander',
                                  },
                                  { label: 'White', value: 'White' },
                                  { label: 'Some other race', value: 'Some other race' },
                                ]}
                              />
                            )}
                          </form.AppField>
                          <form.AppField name={`players[${idx}].dob`}>
                            {(subField) => (
                              <subField.DobField label="Date of Birth" required colSpan="1" />
                            )}
                          </form.AppField>
                        </div>
                        {field.state.value.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 size-7 rounded-full transition-opacity hover:bg-red-100"
                            onClick={() => field.removeValue(idx)}
                          >
                            <Trash2 className="size-4 text-red-700 hover:text-red-900" />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {field.state.value.length < 4 && (
                    <Button
                      type="button"
                      size="icon"
                      className={cn(
                        'size-7 rounded-full bg-green-400 transition-opacity duration-300 hover:bg-green-500',
                        {
                          'pointer-events-none h-0 opacity-0': field.state.value.length >= 4,
                          'opacity-100': field.state.value.length < 4,
                        },
                      )}
                      onClick={() =>
                        field.pushValue({
                          firstName: '',
                          lastName: '',
                          gender: '',
                          ethnicity: '',
                          dob: undefined,
                        })
                      }
                    >
                      <Plus className="h-4 w-4 text-black" />
                    </Button>
                  )}
                </>
              )}
            </form.AppField>
          </div>
          {/* Price */}
          <div className="text-lg font-semibold">Total: ${price}</div>
          {/* Hidden price field for submission, registered with form */}
          <form.AppField name="price">
            {() => <input type="hidden" value={price} />}
          </form.AppField>
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
