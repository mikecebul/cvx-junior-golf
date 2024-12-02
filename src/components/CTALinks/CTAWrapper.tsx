import { cn } from '@/utilities/cn'

export const CTAWrapper = ({
  children,
  direction,
  justify = 'center',
}: {
  children: React.ReactNode
  direction?: 'ltr' | 'rtl'
  justify?: 'center' | 'start'
}) => {
  return (
    <div
      className={cn('flex flex-wrap w-full gap-4 md:justify-center md:items-center', {
        'order-1': direction === 'rtl',
      })}
    >
      {children}
    </div>
  )
}
