import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { CardDescription } from '@/components/ui/card'
import { ArrayItemField } from './types'

interface ItemProps {
  index: number
  name: string
  field: ArrayItemField[]
  labelSingular: string
  label: string
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<FieldValues>
}

export const Item: React.FC<ItemProps> = ({
  index,
  field,
  register,
  name,
  errors,
  labelSingular,
}) => {
  return (
    <div className="space-y-4">
      <CardDescription>
        {labelSingular} {index + 1}
      </CardDescription>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field.map((textField, fieldIndex) => (
          <div key={fieldIndex} className="space-y-2">
            <Label htmlFor={`${index}-${textField.name}`}>{textField.label}</Label>
            <Input
              id={`${index}-${textField.name}`}
              type="text"
              {...register(`${name}[${index}].${textField.name}`, {
                required: textField.required,
              })}
            />
            {textField.required && errors?.[name]?.[index]?.[textField.name] && <Error />}
          </div>
        ))}
      </div>
    </div>
  )
}
