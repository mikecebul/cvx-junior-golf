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
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'

export type SelectOption = { label: string; value: string; id?: string | null }
export type SelectGroup = { groupLabel: string; options: SelectOption[] }
export type SelectFieldOption = SelectOption | SelectGroup

export interface SelectFieldUIProps {
  label?: string | null
  colSpan?: '1' | '2'
  required?: boolean | null
  options?: SelectFieldOption[] | null
}

function isGroup(option: SelectFieldOption): option is SelectGroup {
  return (option as SelectGroup).groupLabel !== undefined
}

export default function SelectField({ label, colSpan, options, required }: SelectFieldUIProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={cn('col-span-2 w-full', { '@lg:col-span-1': colSpan === '1' })}>
      <div className={cn('grid w-full gap-2')}>
        <Label htmlFor={field.name}>
          {label}
          {required ? <span className="text-destructive">*</span> : null}
        </Label>
        <Select onValueChange={(e) => field.handleChange(e)}>
          <SelectTrigger id={field.name}>
            <SelectValue placeholder={`Select a ${label || 'option'}`} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((optionOrGroup, idx) =>
              isGroup(optionOrGroup) ? (
                <SelectGroup key={optionOrGroup.groupLabel}>
                  <SelectLabel>{optionOrGroup.groupLabel}</SelectLabel>
                  {optionOrGroup.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ) : (
                <SelectItem key={optionOrGroup.value} value={optionOrGroup.value}>
                  {optionOrGroup.label}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        {errors && <em className="text-destructive text-sm first:mt-1">{errors[0]?.message}</em>}
      </div>
    </div>
  )
}
