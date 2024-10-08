import type { Block } from 'payload'
import { linkGroup } from '@/fields/link/linkGroup'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'Hero',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'mediumImpact',
      label: 'Type',
      options: [
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
      ],
      required: true,
    },
    {
      type: 'group',
      name: 'highImpact',
      admin: {
        hideGutter: true,
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          defaultValue: 'Charlevoix Junior Golf League',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          defaultValue:
            'Join the Charlevoix Junior Golf League and develop your skills in a fun, competitive environment.',
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
          required: true,
        },
        // {
        //   name: 'svg',
        //   type: 'checkbox',
        //   defaultValue: false,
        //   label: 'Show decorative SVG',
        // },
      ],
    },
    {
      type: 'group',
      name: 'mediumImpact',
      admin: {
        hideGutter: true,
        condition: (_, { type } = {}) => ['mediumImpact'].includes(type),
      },
      fields: [
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ],
    },
  ],
}
