import { linkGroup } from '@/fields/link/linkGroup'
import type { Field } from 'payload'

export const contentFields: Field[] = [
  {
    name: 'hasSubtitle',
    type: 'checkbox',
    label: 'Use Subtitle',
    defaultValue: false,
  },
  {
    name: 'subtitle',
    type: 'group',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData.hasSubtitle),
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'icon',
            type: 'text',
            admin: {
              components: {
                Field: '@/fields/iconSelect/Component',
              },
              width: '33%',
            },
          },
          {
            name: 'text',
            type: 'text',
            // admin: {
            //   width: '50%',
            // },
          },
        ],
      },
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
]
