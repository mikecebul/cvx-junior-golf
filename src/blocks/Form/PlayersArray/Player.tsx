import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'
import { CardDescription } from '@/components/ui/card'

interface PlayerProps {
  index: number
  field: Array<{
    name: string
    label: string
    required?: boolean
    width?: string
  }>
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<FieldValues>
}

const Player: React.FC<PlayerProps> = ({ index, field, register, errors }) => {
  return (
    <div className="space-y-4">
      <CardDescription>Player {index + 1}</CardDescription>
      <div className="grid grid-cols-2 gap-4">
        {field.map((textField, fieldIndex) => (
          <div key={fieldIndex} className="space-y-2">
            <Label htmlFor={`${index}-${textField.name}`}>{textField.label}</Label>
            <Input
              id={`${index}-${textField.name}`}
              type="text"
              {...register(`players[${index}].${textField.name}`, {
                required: textField.required,
              })}
            />
            {textField.required && errors?.players?.[index]?.[textField.name] && <Error />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Player
