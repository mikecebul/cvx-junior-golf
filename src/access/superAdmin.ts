import type { Access, AccessArgs } from 'payload'
import { checkRole } from './checkRole'

export const superAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return checkRole('superAdmin', user)
}
