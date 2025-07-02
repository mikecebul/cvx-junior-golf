'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import type { StateFormField } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { stateOptions } from './options'

export interface StateFieldUIProps {
  label?: string | null
  colSpan?: '1' | '2'
  required?: boolean | null
}

export default function StateField({ label, colSpan, required }: StateFieldUIProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={cn('col-span-2 w-full', { '@lg:col-span-1': colSpan === '1' })}>
      <div className={cn('grid w-full gap-2')}>
        <Label htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Select onValueChange={(e) => field.handleChange(e)} required={!!required}>
          <SelectTrigger id={field.name}>
            <SelectValue placeholder="Pick a state" />
          </SelectTrigger>
          <SelectContent>
            {stateOptions.map(({ label, value }) => (
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
