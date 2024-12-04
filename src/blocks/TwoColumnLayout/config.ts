import { linkGroup } from '@/fields/link/linkGroup'
import { Block } from 'payload'

export const TwoColumnLayout: Block = {
  slug: 'twoColumnLayout',
  interfaceName: 'TwoColumnLayoutBlock',
  fields: [
    {
      name: 'direction',
      type: 'radio',
      defaultValue: 'ltr',
      options: [
        { label: 'Left to Right', value: 'ltr' },
        { label: 'Right to Left', value: 'rtl' },
      ],
      admin: {
        description: 'The direction of the layout',
      },
    },
    {
      name: 'breakpoint',
      type: 'radio',
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      admin: {
        description: 'The breakpoint at which the layout switches to a two column layout',
      },
    },
    {
      name: 'columnOne',
      type: 'group',
      fields: [
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
              name: 'icon',
              type: 'text',
              admin: {
                components: {
                  Field: '@/fields/iconSelect/Component',
                },
              },
            },
            {
              name: 'text',
              type: 'text',
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
      ],
    },
    {
      name: 'columnTwo',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
