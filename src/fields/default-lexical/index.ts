import { Config, type TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/config'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      BlocksFeature({
        blocks: [MediaBlock],
      }),
      LinkFeature({
        enabledCollections: ['pages'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
              validate: ((value, options) => {
                if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                  return true // no validation needed, as no url should exist for internal links
                }
                return value ? true : 'URL is required'
              }) as TextFieldSingleValidation,
            },
          ]
        },
      }),
    ]
  },
})
