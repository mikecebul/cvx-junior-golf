import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { roleSelectMutate } from './access/roleSelectMutate'
import { ensureFirstUserIsSuperAdmin } from './hooks/ensureFirstUserIsSuperAdmin'
import { revalidatePath } from 'next/cache'
import { superAdmin } from '@/access/superAdmin'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    hideAPIURL: !superAdmin,
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
      defaultValue: 'editor',
      required: true,
      access: {
        create: roleSelectMutate,
        read: () => true,
        update: roleSelectMutate,
      },
      admin: {
        components: {
          Field: '@/collections/Users/RoleSelect',
          Cell: '@/collections/Users/RoleCell',
        },
      },
      hooks: {
        beforeChange: [ensureFirstUserIsSuperAdmin],
        afterChange: [
          ({ req }) => req.headers['X-Payload-Migration'] !== 'true' && revalidatePath('/(payload)', 'layout'),
        ],
      },
    },
    {
      name: 'apiKey',
      type: 'text',
      access: {
        read: () => !!superAdmin,
      },
    },
  ],
  timestamps: true,
}

export default Users
