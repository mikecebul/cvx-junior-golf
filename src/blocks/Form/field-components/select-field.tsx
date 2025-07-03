'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import type { SelectFormField } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface SelectFieldUIProps {
  label?: string | null
  colSpan?: '1' | '2'
  required?: boolean | null
  options?: { label: string; value: string; id?: string | null }[] | null
}

export default function SelectField({ label, colSpan, options, required }: SelectFieldUIProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={cn('col-span-2 w-full', { '@lg:col-span-1': colSpan === '1' })}>
      <div className={cn('grid w-full gap-2')}>
        <Label htmlFor={field.name}>{label}</Label>
        <Select onValueChange={(e) => field.handleChange(e)} required={!!required}>
          <SelectTrigger id={field.name}>
            <SelectValue placeholder={`Select a ${label || 'option'}`} className="bg-red-300" />
          </SelectTrigger>
          <SelectContent>
            {options?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {errors && <em className="text-destructive text-sm first:mt-1">{errors[0]?.message}</em>}
      </div>
    </div>
  )
}
