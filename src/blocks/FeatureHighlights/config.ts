import { linkGroup } from '@/fields/link/linkGroup'
import { Block } from 'payload'

export const FeatureHighlights: Block = {
  slug: 'featureHighlights',
  labels: {
    singular: 'Feature Highlights Block',
    plural: 'Feature Highlights Blocks',
  },
  interfaceName: 'FeatureHighlightsBlock',
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
    },
    {
      name: 'description',
      type: 'textarea',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'highlights',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/components/RowLabel/RowLabelWithTitle',
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            components: {
              Field: '@/fields/IconSelect/Component',
            },
          },
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
