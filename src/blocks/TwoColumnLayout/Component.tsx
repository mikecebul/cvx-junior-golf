import Container from '@/components/Container'
import { CTALinks } from '@/components/CTALinks'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { Icon } from '@/components/Icons/Icon'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { TwoColumnLayoutBlock as TwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
export const TwoColumnLayoutBlock = ({
  direction = 'ltr',
  breakpoint = 'md',
  columnOne,
  columnTwo,
}: TwoColumnLayoutBlockType) => {
  const { hasSubtitle, subtitle, title, description, links } = columnOne ?? {}
  const { image } = columnTwo ?? {}

  return (
    <Container>
      <div className={`grid grid-cols-1 ${breakpoint}:grid-cols-2 gap-12`}>
        <div
          className={cn('flex flex-col gap-4 justify-center order-1', {
            'sm:order-2': direction === 'rtl' && breakpoint === 'sm',
            'md:order-2': direction === 'rtl' && breakpoint === 'md',
            'lg:order-2': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-2': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {hasSubtitle && (
            <Badge variant="brand" className="w-fit">
              <Icon name={subtitle?.icon ?? 'trophy'} className="mr-1 size-4" />
              {subtitle?.text}
            </Badge>
          )}
          {title && <Title text={title} />}
          {description && <Description text={description} />}
          {links && <CTALinks links={links} />}
        </div>
        <div
          className={cn('flex justify-center items-center order-2', {
            'sm:order-1': direction === 'rtl' && breakpoint === 'sm',
            'md:order-1': direction === 'rtl' && breakpoint === 'md',
            'lg:order-1': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-1': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {image && <Media resource={image} />}
        </div>
      </div>
    </Container>
  )
}
