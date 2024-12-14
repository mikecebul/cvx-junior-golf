import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ArrayFields } from './ArrayFields'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import { ArrayBlockConfig } from './types'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/utilities/cn'

export const ArrayField: React.FC<ArrayBlockConfig> = (props) => {
  const { label, maxRows = 10, name } = props

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
      <CardContent className="flex flex-col gap-4 px-0">
        <AnimatePresence initial={false} mode="sync">
          {fields.map((field, index) => (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.3 },
              }}
              layout
              transition={{ duration: 0.3 }}
              key={field.id}
              className="rounded-lg border p-4"
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
        <Button
          type="button"
          size="icon"
          className={cn(
            'size-7 rounded-full bg-green-400 transition-opacity duration-300 hover:bg-green-500',
            {
              'pointer-events-none opacity-0': fields.length >= maxRows,
              'opacity-100': fields.length < maxRows,
            },
          )}
          onClick={() => append({})}
        >
          <Plus className="h-4 w-4 text-black" />
        </Button>
      </CardContent>
    </div>
  )
}
