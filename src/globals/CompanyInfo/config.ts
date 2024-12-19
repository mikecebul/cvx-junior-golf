import { authenticated } from '@/access/authenticated'
import { editorOrHigher } from '@/access/editorOrHigher'
import { superAdmin } from '@/access/superAdmin'
import { link } from '@/fields/link'
import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: 'Company Info',
  access: {
    read: authenticated,
    update: editorOrHigher,
  },
  admin: {
    hideAPIURL: !superAdmin,
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req.headers['X-Payload-Migration'] !== 'true') {
          revalidatePath('/(payload)', 'layout')
          revalidatePath('/(frontend)', 'layout')
        }
      },
    ],
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      admin: {},
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              defaultValue: 'info@cvxjrgolf.org',
              admin: { width: '50%' },
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
              admin: { width: '50%' },
            },
            {
              name: 'fax',
              label: 'Fax',
              type: 'text',
              defaultValue: '(231) 547-4970',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'physicalAddress',
          type: 'group',
          label: 'Physical Address',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'street',
                  label: 'Street Address',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'cityStateZip',
                  label: 'City, State, Zip',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'coordinates',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'lat',
                      type: 'number',
                      label: 'Latitude',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'lng',
                      type: 'number',
                      label: 'Longitude',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'mailingAddress',
          type: 'group',
          label: 'Mailing Address',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'street',
                  label: 'Street Address',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'cityStateZip',
                  label: 'City, State, Zip',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
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
