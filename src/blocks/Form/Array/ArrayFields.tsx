import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { CardDescriptionDiv } from '@/components/ui/card'
import type { ArrayEntryField } from './types'
import { DateOfBirth } from '../DateOfBirth'
import { Email } from '../Email'
import { Text } from '../Text'
import { DateOfBirthField } from '../DateOfBirth/type'
import { EmailField, TextField } from '@payloadcms/plugin-form-builder/types'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/utilities/cn'

interface ArrayFieldsProps {
  index: number
  name: string
  fields: ArrayEntryField[]
  labelSingular: string
  label: string
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<FieldValues>
  control: any
  remove: (index: number) => void
  minRows: number
  currentRows: number
}

export const ArrayFields: React.FC<ArrayFieldsProps> = ({
  index,
  fields,
  register,
  name,
  errors,
  labelSingular,
  control,
  remove,
  minRows,
  currentRows,
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
      <CardDescriptionDiv className="flex items-center justify-between">
        {labelSingular} {index + 1}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn('size-7 rounded-full transition-opacity hover:bg-red-100', {
            'pointer-events-none opacity-0': currentRows <= minRows,
            'opacity-100': currentRows > minRows,
          })}
          onClick={() => remove(index)}
        >
          <Trash2 className="size-4 text-red-700 hover:text-red-900" />
        </Button>
      </CardDescriptionDiv>
      <div className="flex flex-wrap gap-4">
        {fields.map((fieldItem, fieldIndex) => (
          <React.Fragment key={fieldIndex}>{renderField(fieldItem, fieldIndex)}</React.Fragment>
        ))}
      </div>
    </div>
  )
}
