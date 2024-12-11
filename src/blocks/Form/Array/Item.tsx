import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { CardDescription } from '@/components/ui/card'
import { ArrayItemField } from './types'
import { DateOfBirth } from '../DateOfBirth'
import { Email } from '../Email'
import { Text } from '../Text'
import { DateOfBirthField } from '../DateOfBirth/type'
import { EmailField, TextField } from '@payloadcms/plugin-form-builder/types'

interface ItemProps {
  index: number
  name: string
  field: ArrayItemField[]
  labelSingular: string
  label: string
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<FieldValues>
  control: any
}

export const Item: React.FC<ItemProps> = ({
  index,
  field,
  register,
  name,
  errors,
  labelSingular,
  control,
}) => {
  const renderField = (fieldItem: ArrayItemField, fieldIndex: number) => {
    switch (fieldItem.blockType) {
      case 'dateOfBirth':
        return (
          <DateOfBirth
            {...(fieldItem as DateOfBirthField)}
            name={`${name}[${index}].${fieldItem.name}`}
            control={control}
            errors={errors}
          />
        )
      case 'email':
        return (
          <Email
            {...(fieldItem as EmailField)}
            name={`${name}[${index}].${fieldItem.name}`}
            errors={errors}
            register={register}
          />
        )
      case 'text':
        return (
          <Text
            {...(fieldItem as TextField)}
            name={`${name}[${index}].${fieldItem.name}`}
            errors={errors}
            register={register}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <CardDescription>
        {labelSingular} {index + 1}
      </CardDescription>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field.map((fieldItem, fieldIndex) => (
          <div key={fieldIndex} className="space-y-2">
            {renderField(fieldItem, fieldIndex)}
          </div>
        ))}
      </div>
    </div>
  )
}
