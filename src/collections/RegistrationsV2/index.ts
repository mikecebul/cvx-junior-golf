import { editorOrHigher } from '@/access/editorOrHigher'
import { CollectionConfig } from 'payload'

export const RegistrationsV2: CollectionConfig = {
  slug: 'registrations-v2',
  access: {
    create: () => true,
    delete: editorOrHigher,
    read: editorOrHigher,
    update: () => true,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['year', 'fullName', 'paid', 'createdAt'],
  },
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            if (siblingData.firstName && siblingData.lastName) {
              siblingData.fullName = `${siblingData.firstName} ${siblingData.lastName}`
            }
          },
        ],
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'dob',
      type: 'date',
      required: true,
    },
    {
      name: 'age',
      type: 'number',
      admin: {
        readOnly: true,
      },
      virtual: true,
    },
    {
      name: 'ethnicity',
      type: 'text',
      required: true,
    },
    {
      name: 'gender',
      type: 'text',
      required: true,
    },
    {
      name: 'parents',
      type: 'array',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
        },
      ],
    },

    {
      name: 'notes',
      type: 'textarea',
      required: false,
    },
    {
      name: 'paid',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'relatedRegistrations',
      type: 'relationship',
      relationTo: 'registrations-v2',
      hasMany: true,
      maxRows: 3,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'stripeCheckoutButton',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: 'src/fields/StripeCheckoutLink/Component',
        },
      },
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc.dob) {
          const birth = new Date(doc.dob)
          const today = new Date()
          let age = today.getFullYear() - birth.getFullYear()
          const m = today.getMonth() - birth.getMonth()
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--
          }
          doc.age = age
        } else {
          doc.age = null
        }
        return doc
      },
    ],
  },
}

export default RegistrationsV2
