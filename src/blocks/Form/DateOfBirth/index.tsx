import type { DateOfBirthField } from './type'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import React from 'react'
import { Controller } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/utilities/cn'

import { Error } from '../Error'
import { Width } from '../Width'

export const DateOfBirth: React.FC<
  DateOfBirthField & {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }
> = ({ name, control, errors, label, required, width, defaultValue }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={control}
        shouldUnregister
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {field.value ? (
                  format(field.value, 'MM/dd/yyyy')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date)
                  setOpen(false)
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={1950}
                toYear={new Date().getFullYear()}
                classNames={{
                  dropdown: "rdp-dropdown bg-card rounded-md border px-2!",
                  dropdown_icon: "ml-2",
                  dropdown_year: "rdp-dropdown_year ml-3",
                  dropdown_month: "",
                }} />
            </PopoverContent>
          </Popover>
        )}
        rules={{ required }}
      />
      <div className="">
        {required && errors[name] && <Error />}
      </div>
    </Width>
  )
}
