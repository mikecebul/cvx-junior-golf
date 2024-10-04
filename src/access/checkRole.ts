import type { User } from '@/payload-types'

export const checkRole = (role: string, user: unknown): boolean => {
  if (!user || typeof user !== 'object' || !('role' in user)) return false
  return (user as User).role === role
}
