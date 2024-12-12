import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ArrayFields } from './ArrayFields'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import { ArrayBlockConfig } from './types'
import { motion, AnimatePresence } from 'motion/react'

export const ArrayField: React.FC<ArrayBlockConfig> = (props) => {
  const { label, minRows = 0, maxRows = 10, name } = props

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    shouldUnregister: true,
  })

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between px-0">
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        <AnimatePresence initial={false}>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              layout
              className="relative space-y-4 rounded-lg border p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: { duration: 0.3 }
              }}
            >
              {fields.length > minRows && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 size-7 rounded-full hover:bg-red-100"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-4 text-red-700 hover:text-red-900" />
                </Button>
              )}
              <ArrayFields
                index={index}
                register={register}
                errors={errors}
                {...props}
                control={control}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {fields.length < maxRows && (
          <Button
            type="button"
            size="icon"
            className="size-7 rounded-full bg-green-400 hover:bg-green-500"
            onClick={() => append({})}
          >
            <Plus className="h-4 w-4 text-black" />
          </Button>
        )}
      </CardContent>
    </div>
  )
}
