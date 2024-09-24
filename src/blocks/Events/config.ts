import { Block } from 'payload'
import { Hero } from '@/blocks/Hero/config'

export const Events: Block = {
  slug: 'events',
  labels: {
    singular: 'Events Block',
    plural: 'Events Blocks',
  },
  interfaceName: 'EventsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'eventItems',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Select up to 3 schedule items to display',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'landscapes',
      required: true,
    },
  ],
}
