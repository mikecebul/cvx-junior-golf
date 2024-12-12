import { cn } from '@/utilities/cn'
import type { ReactNode } from 'react'
import { widthMap, type WidthKey } from '@/utilities/widthMap'

interface WidthProps {
  children: ReactNode
  className?: string
  width?: WidthKey
}

export const Width = ({ children, className, width }: WidthProps) => {
  return <div className={cn('w-full', width && widthMap[width], className)}>{children}</div>
}
