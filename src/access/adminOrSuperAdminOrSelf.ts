import type { Access, AccessArgs } from 'payload'
import { checkRole } from './checkRole'

export const adminOrSuperAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (checkRole('admin', user) || checkRole('superAdmin', user)) return true
  if (id === user.id.toString()) return true
  return false
}
