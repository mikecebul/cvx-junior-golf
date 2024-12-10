import { Block } from 'payload'
import { contentFields } from '@/fields/contentFields'
import { FormBlock } from '../Form/config'

export const NewTwoColumnLayout: Block = {
  slug: 'newTwoColumnLayout',
  interfaceName: 'NewTwoColumnLayoutBlock',
  labels: {
    singular: 'New Two Column Layout',
    plural: 'New Two Column Layouts',
  },
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
          type: 'row',
          fields: [
            {
              name: 'contentType',
              type: 'radio',
              options: [
                { label: 'Call to Action', value: 'cta' },
                { label: 'Rich Text', value: 'richText' },
              ],
              defaultValue: 'cta',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'verticalAlignment',
              type: 'select',
              options: ['top', 'center', 'bottom'],
              defaultValue: 'center',
              admin: {
                width: '25%',
              },
            },
          ],
        },
        {
          name: 'richText',
          type: 'richText',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'richText'),
          },
        },
        {
          name: 'cta',
          label: 'Call to Action',
          type: 'group',
          fields: contentFields,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'cta'),
          },
        },
      ],
    },
    {
      name: 'columnTwo',
      type: 'group',
      fields: [
        {
          name: 'contentType',
          type: 'radio',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Form', value: 'form' },
          ],
          defaultValue: 'image',
        },
        {
          name: 'form',
          type: 'blocks',
          blocks: [FormBlock],
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'form'),
          },
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.contentType === 'image'),
          },
        },
      ],
    },
  ],
}
