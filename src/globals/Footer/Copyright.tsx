'use client'

import { type ReactNode, useEffect, useState } from 'react'

export const Copyright = ({ children }: { children: ReactNode }) => {
  const [year, setYear] = useState<number>()

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <span className="block text-center text-sm text-gray-500">
      © {year} {children}. All Rights Reserved.
    </span>
  )
}
