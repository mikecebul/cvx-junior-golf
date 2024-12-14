import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrHigher } from '@/access/editorOrHigher'
import { linkGroup } from '@/fields/link/linkGroup'
import { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  labels: {
    singular: 'Resource',
    plural: 'Resources',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
