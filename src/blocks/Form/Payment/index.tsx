import type { PaymentField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { Label } from '@/components/ui/label'

export const Payment: React.FC<
  PaymentField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    watch: UseFormWatch<FieldValues>
    setValue: any
  }
> = ({
  name,
  basePrice,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
  watch,
  setValue,
}) => {
  const players = watch('Players') || []
  const totalPrice = basePrice + players.length * 25

  React.useEffect(() => {
    setValue(name, totalPrice)
  }, [totalPrice, name, setValue])

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <div className="text-sm">${totalPrice}</div>

      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
