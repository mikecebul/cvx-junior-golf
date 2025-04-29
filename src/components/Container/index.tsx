import { cn } from '@/utilities/cn'
import { type ReactNode } from 'react'

export default function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={cn(
        'animate-fadeIn relative max-w-full flex-1 flex-col overflow-clip px-4 md:px-8 2xl:container 2xl:mx-auto',
        className,
      )}
    >
      {children}
    </section>
  )
}
