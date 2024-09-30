'use client'

import { useRowLabel } from '@payloadcms/ui'
import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const HoursRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data, rowNumber } = useRowLabel<{ day: string; hours: string }>()

  return (
    <div>
      <p className="dark:text-orange-400 dark:font-medium font-bold capitalize">
        {`${rowNumber} - `}
        <span className="font-semibold">{data.day}:</span>
        <span className="font-normal">{` ${data.hours}`}</span>
      </p>
    </div>
  )
}

export default HoursRowLabel
