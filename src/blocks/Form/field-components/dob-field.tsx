'use client'

import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/utilities/cn'

export interface DobFieldUIProps {
  label?: string | null
  colSpan?: string
  required?: boolean | null
}

export default function DobField({ label, colSpan, required }: DobFieldUIProps) {
  const field = useFieldContext<Date | undefined>()
  const errors = field.state.meta.errors

  return (
    <div className={cn('col-span-2 w-full', { '@lg:col-span-1': colSpan === '1' })}>
      <Label htmlFor={field.name}>{label}</Label>
      <Calendar
        mode="single"
        selected={field.state.value}
        onSelect={(date) => field.handleChange(date)}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
        id={field.name}
        required={!!required}
      />
      {errors && <em className="text-destructive text-sm first:mt-1">{errors[0]?.message}</em>}
    </div>
  )
}
