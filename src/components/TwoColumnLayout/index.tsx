import { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Image from 'next/image'

interface TwoColumnLayoutProps {
  direction?: 'ltr' | 'rtl'
  children: [React.ReactNode, React.ReactNode]
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

/**
 * Two-column layout component that arranges content and media side by side.
 * @param direction 'ltr' (content left, media right) or 'rtl' (media left, content right)
 * @param children Tuple of [Content, Media]
 * @example
 * <TwoColumnLayout direction="ltr">
 *   <>Your content here...</>
 *   <Image src="..." alt="..." />
 * </TwoColumnLayout>
 */
export const TwoColumnLayout = ({
  direction = 'ltr',
  children,
  breakpoint = 'md',
}: TwoColumnLayoutProps) => {
  const [contentColumn, mediaColumn] = children

  return (
    <div className={`grid grid-cols-1 ${breakpoint}:grid-cols-2 gap-12`}>
      <div
        className={cn(
          'flex flex-col gap-4 justify-center order-1',
          direction === 'rtl' && `${breakpoint}:order-2`,
        )}
      >
        {contentColumn}
      </div>
      <div
        className={cn(
          'flex justify-center items-center order-2',
          direction === 'rtl' && `${breakpoint}:order-1`,
        )}
      >
        {mediaColumn}
      </div>
    </div>
  )
}
