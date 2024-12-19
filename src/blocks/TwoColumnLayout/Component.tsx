import Container from '@/components/Container'
import { CTALinks } from '@/components/CTALinks'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { Icon } from '@/components/Icons/Icon'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { TwoColLayout } from '@/payload-types'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { RenderBlocks } from '../RenderBlocks'
import RichTextCarousel from '../RichText/RichTextCarousel'
import { imagesAsMedia } from '@/utilities/imagesAsLandscapes'

export const TwoColumnLayoutBlock = ({
  direction = 'ltr',
  breakpoint = 'md',
  colOne: columnOne,
  colTwo: columnTwo,
}: TwoColLayout) => {
  const {
    contentType: columnOneType, cta, richText, vAlign = 'center' } = columnOne ?? {}
  const { hasSubtitle, subtitle, title, heading, description, links } = cta ?? {}
  const { contentType: columnTwoType, form, images, priority, sticky = false } = columnTwo ?? {}
  const validImages = imagesAsMedia(images)

  return (
    <Container className="xl:overflow-visible">
      <div
        className={cn('grid grid-cols-1 gap-12', `${breakpoint}:grid-cols-2`, {
          'xl:items-start': sticky,
        })}
      >
        <div
          className={cn('order-1 flex flex-col justify-center gap-4', {
            'justify-center': vAlign === 'center',
            'justify-start': vAlign === 'top',
            'justify-end': vAlign === 'bottom',
            'sm:order-2': direction === 'rtl' && breakpoint === 'sm',
            'md:order-2': direction === 'rtl' && breakpoint === 'md',
            'lg:order-2': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-2': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {columnOneType === 'cta' ? (
            <>
              {hasSubtitle && (
                <Badge variant="brand" className="w-fit">
                  <Icon name={subtitle?.icon ?? 'trophy'} className="mr-1 size-4" />
                  {subtitle?.text}
                </Badge>
              )}
              {title && <Title text={title} heading={heading ?? 'h2'} />}
              {description && <Description text={description} />}
              {links && <CTALinks links={links} />}
            </>
          ) : (
            richText && <RichText content={richText} />
          )}
        </div>
        <div
          className={cn('order-2', {
            'flex items-center justify-center': !sticky,
            'sticky xl:top-20 xl:pt-2': sticky,
            'sm:order-1': direction === 'rtl' && breakpoint === 'sm',
            'md:order-1': direction === 'rtl' && breakpoint === 'md',
            'lg:order-1': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-1': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {columnTwoType === 'form' ? (
            form && <RenderBlocks blocks={form} nested />
          ) : validImages.length > 0 ? (
            <RichTextCarousel images={validImages} priority={priority} />
          ) : (
            <Media resource={images?.[0]} />
          )}
        </div>
      </div>
    </Container>
  )
}