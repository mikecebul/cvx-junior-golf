import * as React from 'react'

interface ErrorProps {
  message?: string
}

export const Error: React.FC<ErrorProps> = ({ message = 'This field is required' }) => {
  return <div className="pt-1 text-red-500 text-sm">{message}</div>
}
