import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (!user) {
    return false
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
