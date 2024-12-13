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
      <CardContent className="flex flex-col px-0 gap-4">
        <AnimatePresence mode="sync">
          {fields.map((field, index) => (
            <motion.div
              initial={false}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              layout
              transition={{ duration: 0.2 }}
              key={field.id}
              className="relative rounded-lg border p-4 overflow-hidden"
            >
              <ArrayFields
                index={index}
                register={register}
                errors={errors}
                {...props}
                control={control}
                remove={remove}
                currentRows={fields.length}
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
        )
        }

      </CardContent>
    </div>
  )
}
