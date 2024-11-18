import { superAdmin } from '@/access/superAdmin'
import { link } from '@/fields/link'
import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: 'Company Info',
  admin: {
    description: 'Update business information.',
    hideAPIURL: !superAdmin,
  },
  hooks: {
    afterChange: [({ req }) => req.headers['X-Payload-Migration'] !== 'true' && revalidatePath('/', 'layout')],
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      admin: {
        description: 'Company contact information.',
      },
      fields: [
        {
          name: 'physicalAddress',
          type: 'group',
          label: 'Physical Address',
          admin: {
            description: 'The physical location of the business.',
          },
          fields: [
            {
              name: 'address',
              type: 'text',
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'googleMapLink',
              type: 'text',
              label: 'Google Map Link',
              admin: {
                description: 'Optional: Add a Google Maps link for this address',
                width: '100%'
              },
            },
          ],
        },
        {
          name: 'mailingAddress',
          type: 'group',
          label: 'Mailing Address',
          admin: {
            description: 'The mailing address for the business.',
          },
          fields: [
            {
              name: 'address',
              type: 'text',
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'googleMapLink',
              type: 'text',
              label: 'Google Map Link',
              admin: {
                description: 'Optional: Add a Google Maps link for this address',
                width: '100%'
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'text',
              defaultValue: '(231) 547-1144',
              admin: { width: '45%' },
            },
            {
              name: 'fax',
              label: 'Fax',
              type: 'text',
              defaultValue: '(231) 547-4970',
              admin: { width: '45%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              defaultValue: 'info@cvxjrgolf.org',
              admin: { width: '45%' },
            },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/globals/CompanyInfo/SocialRowLabel',
        },
      },
      fields: [
        {
          name: 'platform',
          type: 'text',
        },
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'hours',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/globals/CompanyInfo/HoursRowLabel',
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              admin: {
                layout: 'horizontal',
                width: '50%',
              },
              defaultValue: 'default',
              options: [
                {
                  label: 'Day/Hours',
                  value: 'default',
                },
                {
                  label: 'Custom Note',
                  value: 'custom',
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'default',
          },
          fields: [
            {
              name: 'day',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'hours',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'note',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
      ],
    },
  ],
}
