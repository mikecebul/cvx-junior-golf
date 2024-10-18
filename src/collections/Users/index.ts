import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { roleSelectMutate } from './access/roleSelectMutate'
import { ensureFirstUserIsSuperAdmin } from './hooks/ensureFirstUserIsSuperAdmin'
import { revalidatePath } from 'next/cache'
import { superAdmin } from '@/access/superAdmin'
import { adminOrSuperAdmin } from '@/access/adminOrSuperAdmin'
import { self } from '@/access/self'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: ({ req }) => adminOrSuperAdmin({ req }),
    delete: ({ req, id }) => self({ req, id }) || adminOrSuperAdmin({ req, id }),
    read: authenticated,
    update: ({ req, id }) => self({ req, id }) || adminOrSuperAdmin({ req, id }),
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
          ({ req }) =>
            req.headers['X-Payload-Migration'] !== 'true' && revalidatePath('/(payload)', 'layout'),
        ],
      },
    },
    {
      name: 'enableAPIKey',
      type: 'checkbox',
      access: {
        update: ({ req }) => !!superAdmin({ req }),
      },
    },
    {
      name: 'apiKey',
      type: 'text',
      access: {
        update: ({ req }) => !!superAdmin({ req }),
      },
    },
  ],
  timestamps: true,
}

export default Users
