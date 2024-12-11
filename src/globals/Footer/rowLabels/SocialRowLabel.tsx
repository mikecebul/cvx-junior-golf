'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const SocialRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<{ platform: string }>()

  return (
    <div>
      <p className="dark:text-orange-400 dark:font-medium font-bold capitalize">{`${(rowNumber ?? 0) + 1} - ${data.platform || 'undefined'}`}</p>
    </div>
  )
}

export default SocialRowLabel
