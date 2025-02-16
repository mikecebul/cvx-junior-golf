import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { CardDescriptionDiv } from '@/components/ui/card'
import type { ArrayEntryField } from './types'
import { DateOfBirth } from '../DateOfBirth'
import { Email } from '../Email'
import { Text } from '../Text'
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

type FieldComponentType = ArrayEntryField['blockType']

const fieldComponents: Record<FieldComponentType, React.ComponentType<any>> = {
  dateOfBirth: DateOfBirth,
  email: Email,
  text: Text,
} as const

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
    const Field = fieldComponents[fieldItem.blockType]

    if (Field) {
      const fieldName = `${name}[${index}].${fieldItem.name}`
      const wrappedErrors = {
        [fieldName]: errors?.[name]?.[index]?.[fieldItem.name]
      }
      return (
        <Field
          {...(fieldItem as any)}
          name={fieldName}
          control={control}
          errors={wrappedErrors}
          register={register}
        />
      )
    }
    return null
  }

  return (
    <div className="">
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
      <div className="flex flex-wrap gap-x-4 gap-y-3 ">
        {fields.map((fieldItem, fieldIndex) => (
          <React.Fragment key={fieldIndex}>{renderField(fieldItem, fieldIndex)}</React.Fragment>
        ))}
      </div>
    </div>
  )
}
