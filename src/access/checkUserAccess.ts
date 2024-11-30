import { User } from 'payload'
import { checkRole } from './checkRole'

const ROLE_HIERARCHY = ['user', 'admin', 'superadmin'] as const
type Role = (typeof ROLE_HIERARCHY)[number]

const isUser = (user: unknown): user is User => {
  return (
    typeof user === 'object' &&
    user !== null &&
    'role' in user &&
    ROLE_HIERARCHY.includes((user as any).role as Role)
  )
}

export const canOperateOnUser = (operatingUser: unknown, targetUser: unknown): boolean => {
  if (!checkRole(['admin', 'superadmin'], operatingUser)) return false
  if (!isUser(operatingUser) || !isUser(targetUser)) return false

  return ROLE_HIERARCHY.indexOf(operatingUser.role) > ROLE_HIERARCHY.indexOf(targetUser.role)
}
