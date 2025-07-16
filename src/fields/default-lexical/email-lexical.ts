import { Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'

export const emailLexical: Config['editor'] = lexicalEditor({
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
    ]
  },
})
