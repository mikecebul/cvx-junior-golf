'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'
type RowProps =
  | {
    type: 'default'
    day: string
    hours: string
  }
  | {
    type: 'custom'
    note: string
  }

const HoursRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<RowProps>()
  if (data.type === 'default')
    return (
      <div>
        <p className="dark:text-orange-400 dark:font-medium font-bold capitalize">{`${(rowNumber ?? 0) + 1} - ${data.day}: ${data.hours}`}</p>
      </div>
    )
  if (data.type === 'custom')
    return (
      <div>
        <p className="dark:text-orange-400 dark:font-medium font-bold capitalize">{`${(rowNumber ?? 0) + 1} - ${data.note}`}</p>
      </div>
    )
}

export default HoursRowLabel
