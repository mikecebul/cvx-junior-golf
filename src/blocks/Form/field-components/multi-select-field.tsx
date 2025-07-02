'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { CheckCircleIcon } from 'lucide-react'

export interface MultiSelectFieldUIProps {
  label?: string | null
  colSpan?: '1' | '2'
  required?: boolean | null
  options?: string[]
}

const DEFAULT_OPTIONS = [
  'Assessment',
  'Counseling',
  'Drivers license',
  'Domestic violence',
  'OWI safety class',
  'Narcan kits',
]

export default function MultiSelectField({
  label,
  colSpan,
  options = DEFAULT_OPTIONS,
}: MultiSelectFieldUIProps) {
  const field = useFieldContext<string[]>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const value: string[] = Array.isArray(field.state.value) ? field.state.value : []

  function toggleOption(option: string) {
    if (value.includes(option)) {
      field.handleChange(value.filter((v) => v !== option))
    } else {
      field.handleChange([...value, option])
    }
  }

  return (
    <div className={cn('col-span-2 w-full', { '@lg:col-span-1': colSpan === '1' })}>
      <div className={cn('grid w-full gap-2')}>
        <Label htmlFor={field.name}>{label}</Label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const selected = value.includes(option)
            return (
              <button
                key={option}
                type="button"
                className={cn(
                  'flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors',
                  selected
                    ? 'border-green-600 bg-green-500 text-white'
                    : 'bg-background border-gray-300 hover:bg-gray-100',
                )}
                onClick={() => toggleOption(option)}
                aria-pressed={selected}
              >
                {selected ? <CheckCircleIcon className="mr-1 h-4 w-4" /> : null}
                {option}
              </button>
            )
          })}
        </div>
      </div>
      <div>
        {errors && (
          <em className="text-destructive text-sm first:mt-1">{errors[0]?.message || errors[0]}</em>
        )}
      </div>
    </div>
  )
}
