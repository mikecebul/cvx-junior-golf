import Container from '@/components/Container'
import { DonateBlock as DonateBlockType } from '@/payload-types'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'

export const DonateBlock = ({ title, description, link, image }: DonateBlockType) => {
  return (
    <Container>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        {image && typeof image === 'object' && (
          <Image
            src={image.url ?? '/placeholder.png'}
            alt={image.alt}
            width={960}
            height={640}
            className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        )}
        <div className="flex flex-col gap-12 justify-center items-center">
          <div className="flex flex-col justify-start gap-4">
            <div className="flex flex-col">
              {title && <Title heading="h2" text={title} />}
              {description && <Description text={description} />}
            </div>
            <div className="flex justify-start">
              {link && <CMSLink {...link} appearance="brand" size="xl" />}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
