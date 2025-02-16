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
      <CardHeader className="flex flex-row items-center justify-between px-0 py-2">
        <CardTitle className='text-base tracking-normal'>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-0 py-2">
        <AnimatePresence initial={false} mode="sync">
          {fields.map((field, index) => (
            <motion.div
              initial={{ marginBottom: 0 }}
              animate={{ marginBottom: 8 }}
              exit={{ marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              key={field.id}
            >
              <motion.div
                initial={{ opacity: 0, height: 0, padding: 0 }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  padding: 8
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  padding: 0,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  opacity: { duration: 0.05, delay: 0.15 },
                  height: { duration: 0.2 },
                  padding: { duration: 0.2 }
                }}
                className="rounded-lg border w-full overflow-hidden"
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
            </motion.div>
          ))}
        </AnimatePresence>
        <Button
          type="button"
          size="icon"
          className={cn(
            'size-7 rounded-full bg-green-400 transition-opacity duration-300 hover:bg-green-500',
            {
              'pointer-events-none opacity-0 h-0': fields.length >= maxRows,
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
