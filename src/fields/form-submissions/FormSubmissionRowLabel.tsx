'use client'

import { useRowLabel } from '@payloadcms/ui'

export const FormSubmissionRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ field: string; value: string }>()
  return (
    <div>
      <span className="capitalize">{`${data.field || 'field'}: `}</span>
      <span className="dark:text-orange-400 dark:font-medium font-bold">{data.value || 'value  '}</span>
    </div>
  )
}

export default FormSubmissionRowLabel
