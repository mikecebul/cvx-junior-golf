import type { PaymentField, TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
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
  }
> = ({ name, basePrice, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...register(name, {
          required: requiredFromProps,
          value: basePrice
        })}
        defaultValue={basePrice}
        readOnly
        disabled
        value={basePrice}
      />

      {requiredFromProps && errors[name] && <Error />}
    </Width>
  );
}