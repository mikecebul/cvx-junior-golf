'use client'

import { useRowLabel } from '@payloadcms/ui'

export const PlayersArrayRowLabel = () => {
  const { data } = useRowLabel<{ firstName: string; lastName: string }>()

  return (
    <div>
      <span>{`Name: `}</span>
      <span className="dark:text-orange-400 dark:font-medium font-bold">{`${data.firstName ?? ''} ${data.lastName ?? ''}`}</span>
    </div>
  )
}

export default PlayersArrayRowLabel
