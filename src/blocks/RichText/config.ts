import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'richContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] })]
        },
      }),
    },
    {
      name: 'priority',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
