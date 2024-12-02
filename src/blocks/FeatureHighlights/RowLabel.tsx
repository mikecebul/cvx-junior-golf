'use client'

import { useRowLabel } from '@payloadcms/ui'

const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title: string }>()
  return (
    <div className="dark:text-orange-400 dark:font-medium font-bold capitalize">{`${(rowNumber ?? 0) + 1} - ${data.title || 'Untitled'}`}</div>
  )
}

export default RowLabel
