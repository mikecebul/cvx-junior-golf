import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Item } from './Item'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import { ArrayField } from './types'

export const Array: React.FC<ArrayField> = (props) => {
  const { fields: itemFields, labelPlural, minRows = 0, maxRows = 10 } = props
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: labelPlural,
    shouldUnregister: true,
  })

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between px-0">
        <CardTitle>{props.labelPlural}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
            {fields.length > minRows && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full size-7 hover:bg-red-100"
                onClick={() => remove(index)}
              >
                <Trash2 className="size-4 text-red-700 hover:text-red-900" />
              </Button>
            )}
            <Item index={index} field={itemFields} register={register} errors={errors} {...props} />
          </div>
        ))}
        {fields.length < maxRows && (
          <Button
            type="button"
            size="icon"
            className="rounded-full size-7 hover:bg-green-500 bg-green-400"
            onClick={() => append({})}
          >
            <Plus className="h-4 w-4 text-black" />
          </Button>
        )}
      </CardContent>
    </div>
  )
}
