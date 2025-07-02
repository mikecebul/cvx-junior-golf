'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxFormField } from '@/payload-types'

export interface CheckboxFieldUIProps {
  label?: string | null
  colSpan?: '1' | '2'
  required?: boolean | null
}

export default function CheckboxField({ label, colSpan, required }: CheckboxFieldUIProps) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div
      className={cn('col-span-2 flex w-full flex-col justify-start', {
        '@lg:col-span-1': colSpan === '1',
      })}
    >
      <div className={cn('flex items-center space-x-2')}>
        <Checkbox
          id={field.name}
          checked={field.state.value ?? false}
          onBlur={() => field.handleBlur()}
          onCheckedChange={(checked) => field.handleChange(!!checked)}
          required={!!required}
        />
        <Label htmlFor={field.name}>{label}</Label>
      </div>
      <div>{errors && <em className="text-destructive text-sm first:mt-1">{errors[0]}</em>}</div>
    </div>
  )
}
