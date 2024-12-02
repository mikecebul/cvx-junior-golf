import { link } from '@/fields/link'
import { linkGroup } from '@/fields/link/linkGroup'
import { Block } from 'payload'

export const Donate: Block = {
  slug: 'donate',
  interfaceName: 'DonateBlock',
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
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
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
  ],
}
