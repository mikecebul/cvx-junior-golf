import * as React from 'react'

interface ErrorProps {
  message?: string
}

export const Error: React.FC<ErrorProps> = ({ message = 'required' }) => {
  return <div className="pt-1 text-red-500 text-sm">{message}</div>
}
