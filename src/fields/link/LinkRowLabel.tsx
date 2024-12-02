'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'
type LinkProps = {
  link: {
    label: string
  }
}
const LinkRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<LinkProps>()

  return (
    <div className="dark:text-orange-400 dark:font-medium font-bold capitalize">{`${(rowNumber ?? 0) + 1} - ${data?.link?.label || 'Untitled'}`}</div>
  )
}

export default LinkRowLabel
