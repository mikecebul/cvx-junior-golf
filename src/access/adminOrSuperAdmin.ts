import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const adminOrSuperAdmin: Access = async ({ req: { user, payload }, id }) => {
  if (!user) return false

  if (id) {
    const fetchedUser = await payload.findByID({
      collection: 'users',
      id,
      depth: 0,
    })
    if (fetchedUser.role === 'superAdmin' && user.role === 'admin') return false
  }

  return checkRole('admin', user) || checkRole('superAdmin', user)
}
