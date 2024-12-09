import { Block } from 'payload'
import { linkCards } from '@/fields/cards/linkCards'

export const Links: Block = {
  slug: 'linksBlock',
  interfaceName: 'LinksBlock',
  fields: [
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
    },
    linkCards,
  ],
}
