'use client'

import { type ReactNode } from 'react'

export const Copyright = ({ children }: { children: ReactNode }) => {
  return (
    <span className="block text-center text-sm text-gray-500">
      © {new Date().getFullYear()} {children}.{' '}
      <span className="inline-block">All rights reserved.</span>
    </span>
  )
}
