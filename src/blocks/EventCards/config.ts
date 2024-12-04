import { Block } from 'payload'

export const EventCards: Block = {
  slug: 'eventCards',
  interfaceName: 'EventCardsBlock',
  labels: {
    singular: 'Event Cards',
    plural: 'Event Card Blocks',
  },
  fields: [
    {
      name: 'eventCards',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      minRows: 3,
      maxRows: 3,
      admin: {
        description: 'Select up to 3 schedule items to display',
      },
    },
  ],
}
