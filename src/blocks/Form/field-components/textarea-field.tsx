'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { Textarea } from '@/components/ui/textarea'
import { TextareaFormField } from '@/payload-types'

export interface TextareaFieldUIProps {
  label?: string | null
  colSpan?: '1' | '2'
  required?: boolean | null
}

export default function TextareaField({ label, colSpan, required }: TextareaFieldUIProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={cn('col-span-2 w-full', { '@md:col-span-1': colSpan === '1' })}>
      <div className={cn('grid w-full gap-2')}>
        <Label htmlFor={field.name}>{label}</Label>
        <Textarea
          id={field.name}
          value={field.state.value ?? ''}
          onBlur={() => field.handleBlur()}
          onChange={(e) => field.handleChange(e.target.value)}
          required={!!required}
          autoComplete="off"
        />
      </div>
      <div>
        {errors && <em className="text-destructive text-sm first:mt-1">{errors[0]?.message}</em>}
      </div>
    </div>
  )
}
