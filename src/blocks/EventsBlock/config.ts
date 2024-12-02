import { linkGroup } from '@/fields/link/linkGroup'
import { Block } from 'payload'

export const Events: Block = {
  slug: 'events',
  labels: {
    singular: 'Events Block',
    plural: 'Events Blocks',
  },
  interfaceName: 'EventsBlock',
  fields: [
    {
      name: 'direction',
      type: 'radio',
      defaultValue: 'ltr',
      options: [
        { label: 'Left to Right', value: 'ltr' },
        { label: 'Right to Left', value: 'rtl' },
      ],
    },
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
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          components: {
            RowLabel: '@/fields/link/LinkRowLabel',
          },
        },
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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
  ],
}
