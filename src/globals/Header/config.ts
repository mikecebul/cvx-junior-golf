import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { authenticated } from '@/access/authenticated'
import { editorOrHigher } from '@/access/editorOrHigher'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: authenticated,
    update: editorOrHigher,
  },
  admin: { hideAPIURL: true },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/fields/link/LinkRowLabel',
        },
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
