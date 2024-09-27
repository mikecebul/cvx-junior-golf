import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'enableStripe',
      type: 'checkbox',
      label: 'Enable Stripe',
      defaultValue: false,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      label: 'Payment Status',
      options: ['pending', 'paid', 'failed'],
      defaultValue: 'pending',
      required: true,
      admin: {
        hidden: true,
        condition: (_, { enableStripe }) => Boolean(enableStripe),
      },
    },
  ],
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
