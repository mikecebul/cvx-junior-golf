import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const editorOrHigher: Access = ({ req: { user } }) => {
  if (!user) return false

  return checkRole(['editor', 'admin', 'superAdmin'], user)
}
