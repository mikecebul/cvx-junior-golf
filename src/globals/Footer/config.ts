import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { superAdmin } from '@/access/superAdmin'
import { authenticated } from '@/access/authenticated'
import { editorOrHigher } from '@/access/editorOrHigher'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: authenticated,
    update: editorOrHigher,
  },
  admin: { hideAPIURL: !superAdmin },
  fields: [
    {
      name: 'pageLinks',
      type: 'array',
      label: 'Page Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        components: {
          RowLabel: '@/fields/link/LinkRowLabel',
        },
      },
    },
    {
      name: 'showContact',
      type: 'checkbox',
      defaultValue: true,
      label: 'Add column for business contact information.',
    },
    {
      name: 'showGoogleMap',
      type: 'checkbox',
      label: 'Add Google Map to footer.',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
