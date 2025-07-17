'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { Checkbox } from '@/components/ui/checkbox'

export interface CheckboxFieldUIProps {
  label?: string | null
  colSpan?: '1' | '2'
  required?: boolean | null
}

export default function CheckboxField({ label, colSpan, required }: CheckboxFieldUIProps) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  // console.log('CheckboxField', { field, errors })

  return (
    <div
      className={cn('col-span-2 flex w-full flex-col justify-start', {
        '@lg:col-span-1': colSpan === '1',
      })}
    >
      <div className={cn('flex items-start space-x-2')}>
        <Checkbox
          id={field.name}
          checked={field.state.value ?? false}
          onBlur={() => field.handleBlur()}
          onCheckedChange={(checked) => field.handleChange(!!checked)}
        />
        <span
          className={cn('text-destructive', {
            'text-transparent select-none': !required,
          })}
        >
          *
        </span>
        <Label htmlFor={field.name}>{label}</Label>
      </div>
      <div>
        {errors && errors.length > 0 && (
          <em className="text-destructive text-sm first:mt-1">{errors[0].message}</em>
        )}
      </div>
    </div>
  )
}
