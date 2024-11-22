import { CollectionConfig } from 'payload'
import { createCharge } from './hooks/createCharge'
import { FormBuilderPluginConfig } from './types'
import { sendEmail } from './hooks/sendEmail'
import { adminOrSuperAdmin } from '@/access/adminOrSuperAdmin'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    create: anyone,
    read: authenticated,
    update: ({ req }) => adminOrSuperAdmin({ req }),
    delete: ({ req }) => adminOrSuperAdmin({ req }),
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      admin: {
        readOnly: true,
      },
      relationTo: 'forms',
      required: true,
      validate: async (value, { req: { payload }, req }) => {
        /* Don't run in the client side */
        if (!payload) {
          return true
        }

        try {
          await payload.findByID({
            id: value,
            collection: 'forms',
            req,
          })
          return true
        } catch (error) {
          return 'Cannot create this submission because this form does not exist.'
        }
      },
    },
    {
      name: 'formData',
      type: 'json',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Payment amount',
        position: 'sidebar',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Paid',
          value: 'paid',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
      ],
      admin: {
        description: 'Current status of the payment',
        position: 'sidebar',
      },
    },
  ],
  admin: {
    enableRichTextRelationship: false,
  },
  hooks: {
    beforeChange: [
      (args) => {
        const plugin = args.req.payload.config.plugins.find((p) => p.name === 'formBuilderPlugin')
        return createCharge(args, plugin as FormBuilderPluginConfig)
      },
      (args) => {
        const plugin = args.req.payload.config.plugins.find((p) => p.name === 'formBuilderPlugin')
        return sendEmail(args, plugin as FormBuilderPluginConfig)
      },
    ],
  },
}
