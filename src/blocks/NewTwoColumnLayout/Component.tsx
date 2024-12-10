import Container from '@/components/Container'
import { CTALinks } from '@/components/CTALinks'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { Icon } from '@/components/Icons/Icon'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { NewTwoColumnLayoutBlock as NewTwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { RenderBlocks } from '../RenderBlocks'
import RichTextCarousel from '../RichText/RichTextCarousel'
import { imagesAsMedia } from '@/utilities/imagesAsLandscapes'

export const NewTwoColumnLayoutBlock = ({
  direction = 'ltr',
  breakpoint = 'md',
  columnOne,
  columnTwo,
}: NewTwoColumnLayoutBlockType) => {
  const { contentType: columnOneType, cta, richText, verticalAlignment = 'center' } = columnOne ?? {}
  const { hasSubtitle, subtitle, title, description, links } = cta ?? {}
  const { contentType: columnTwoType, form, images, priority } = columnTwo ?? {}
  const validImages = imagesAsMedia(images)

  return (
    <Container>
      <div className={`grid grid-cols-1 ${breakpoint}:grid-cols-2 gap-12`}>
        <div
          className={cn('flex flex-col gap-4 justify-center order-1', {
            'justify-center': verticalAlignment === 'center',
            'justify-start': verticalAlignment === 'top',
            'justify-end': verticalAlignment === 'bottom',
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
              {title && <Title text={title} />}
              {description && <Description text={description} />}
              {links && <CTALinks links={links} />}
            </>
          ) : (
            richText && <RichText content={richText} />
          )}
        </div>
        <div
          className={cn('flex justify-center items-center order-2', {
            'sm:order-1': direction === 'rtl' && breakpoint === 'sm',
            'md:order-1': direction === 'rtl' && breakpoint === 'md',
            'lg:order-1': direction === 'rtl' && breakpoint === 'lg',
            'xl:order-1': direction === 'rtl' && breakpoint === 'xl',
          })}
        >
          {columnTwoType === 'form' ? (
            form && <RenderBlocks blocks={form} nested />
          ) : (
            validImages.length > 0 ? <RichTextCarousel images={validImages} priority={priority} /> : <Media resource={images?.[0]} />
          )}
        </div>
      </div>
    </Container>
  )
}
