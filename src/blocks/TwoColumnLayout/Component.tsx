import Container from '@/components/Container'
import { CTALinks } from '@/components/CTALinks'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { Media } from '@/components/Media'
import type { TwoColumnLayoutBlock as TwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
export const TwoColumnLayoutBlock = ({
  direction = 'ltr',
  breakpoint = 'md',
  columnOne,
  columnTwo,
}: TwoColumnLayoutBlockType) => {
  const { title, description, links } = columnOne ?? {}
  const { image } = columnTwo ?? {}

  const getBreakpointOrderClass = (order: 1 | 2) => {
    switch (breakpoint) {
      case 'sm':
        return `sm:order-${order}`
      case 'md':
        return `md:order-${order}`
      case 'lg':
        return `lg:order-${order}`
      case 'xl':
        return `xl:order-${order}`
      default:
        return `lg:order-${order}` // fallback to lg
    }
  }

  return (
    <Container>
      <div className={`grid grid-cols-1 ${breakpoint}:grid-cols-2 gap-12`}>
        <div
          className={cn('flex flex-col gap-4 justify-center order-1', {
            [getBreakpointOrderClass(2)]: direction === 'rtl',
          })}
        >
          {title && <Title text={title} />}
          {description && <Description text={description} />}
          {links && <CTALinks links={links} />}
        </div>
        <div
          className={cn('flex justify-center items-center order-2', {
            [getBreakpointOrderClass(1)]: direction === 'rtl',
          })}
        >
          {image && <Media resource={image} />}
        </div>
      </div>
    </Container>
  )
}
