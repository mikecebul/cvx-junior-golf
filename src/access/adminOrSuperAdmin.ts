import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const adminOrSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false

  return checkRole(['admin', 'superAdmin'], user)
}
