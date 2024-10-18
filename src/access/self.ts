import type { Access } from 'payload'

export const self: Access = ({ req: { user }, id }) => {
  if (!user || !id) return false
  return String(id) === String(user.id)
}
