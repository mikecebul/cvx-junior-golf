import type { Access, AccessArgs } from 'payload'
import { checkRole } from './checkRole'

export const adminOrSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return checkRole('admin', user) || checkRole('superAdmin', user)
}
