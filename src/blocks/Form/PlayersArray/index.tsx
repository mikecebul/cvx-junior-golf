import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Player from './Player'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

export const PlayersArray: React.FC<any> = (props) => {
  const { fields: playerFields } = props
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'players' })

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{props.label || 'Players'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full size-7 hover:bg-red-100"
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4 text-red-700 hover:text-red-900" />
            </Button>
            <Player index={index} field={playerFields} {...props} />
          </div>
        ))}
        <Button
          type="button"
          size="icon"
          className="rounded-full size-7 hover:bg-green-500 bg-green-400"
          onClick={() => append({})}
        >
          <Plus className="h-4 w-4 text-black" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default PlayersArray
