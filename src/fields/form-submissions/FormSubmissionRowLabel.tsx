'use client'

import { useRowLabel } from '@payloadcms/ui'

export const FormSubmissionRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ field: string; value: string }>()
  return (
    <div className="text-orange-400 capitalize">{`${rowNumber} - ${data.field || 'field'} : ${data.value || 'value  '}`}</div>
  )
}

export default FormSubmissionRowLabel
