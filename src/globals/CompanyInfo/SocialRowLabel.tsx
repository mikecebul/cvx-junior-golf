'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'
type LinkProps = {
  platform: string
  link: {
    label: string
  }
}
const SocialRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<LinkProps>()

  return (
    <div className="dark:text-orange-400 dark:font-medium font-bold capitalize">{`${(rowNumber ?? 0) + 1} - ${data.platform || 'Untitled'}`}</div>
  )
}

export default SocialRowLabel
