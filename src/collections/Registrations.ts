import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrHigher } from '@/access/editorOrHigher'
import { CollectionConfig } from 'payload'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  admin: {
    useAsTitle: 'childLastName',
    defaultColumns: [
      'year',
      'childLastName',
      'childFirstName',
      'parentName',
      'parentEmail',
      'createdAt',
    ],
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'childFirstName',
      type: 'text',
      required: true,
    },
    {
      name: 'childLastName',
      type: 'text',
      required: true,
    },
    {
      name: 'childBirthdate',
      type: 'date',
      required: true,
    },
    {
      name: 'ethnicity',
      type: 'text',
      required: false,
    },
    {
      name: 'gender',
      type: 'text',
      required: false,
    },
    {
      name: 'parentName',
      type: 'text',
      required: true,
    },
    {
      name: 'parentPhone',
      type: 'text',
      required: true,
    },
    {
      name: 'parentEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
    },
  ],
}

export default Registrations
