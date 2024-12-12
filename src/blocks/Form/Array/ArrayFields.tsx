import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { CardDescription } from '@/components/ui/card'
import type { ArrayEntryField } from './types'
import { DateOfBirth } from '../DateOfBirth'
import { Email } from '../Email'
import { Text } from '../Text'
import { DateOfBirthField } from '../DateOfBirth/type'
import { EmailField, TextField } from '@payloadcms/plugin-form-builder/types'

interface ArrayFieldsProps {
  index: number
  name: string
  fields: ArrayEntryField[]
  labelSingular: string
  label: string
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<FieldValues>
  control: any
}

export const ArrayFields: React.FC<ArrayFieldsProps> = ({
  index,
  fields,
  register,
  name,
  errors,
  labelSingular,
  control,
}) => {
  const renderField = (fieldItem: ArrayEntryField, fieldIndex: number) => {
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
      <div className="flex flex-wrap gap-4">
        {fields.map((fieldItem, fieldIndex) => (
          <React.Fragment key={fieldIndex}>{renderField(fieldItem, fieldIndex)}</React.Fragment>
        ))}
      </div>
    </div>
  )
}
