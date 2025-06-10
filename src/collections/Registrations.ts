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
      name: 'childAge',
      type: 'number',
      admin: {
        readOnly: true,
      },
      virtual: true,
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
    {
      name: 'postalCode',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc.childBirthdate) {
          const birth = new Date(doc.childBirthdate)
          const today = new Date()
          let age = today.getFullYear() - birth.getFullYear()
          const m = today.getMonth() - birth.getMonth()
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--
          }
          doc.childAge = age
        } else {
          doc.childAge = null
        }
        return doc
      },
    ],
  },
}

export default Registrations
