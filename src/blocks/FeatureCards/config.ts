import { iconSelect } from '@/fields/iconSelect/config'
import { Block } from 'payload'

export const FeatureCards: Block = {
  slug: 'featureCards',
  interfaceName: 'FeatureCardsBlock',
  labels: {
    singular: 'Feature Cards',
    plural: 'Feature Card Blocks',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/components/RowLabel/RowLabelWithTitle',
        },
      },
      fields: [
        iconSelect,
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
