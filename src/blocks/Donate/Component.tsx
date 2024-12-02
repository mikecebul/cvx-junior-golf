import Container from '@/components/Container'
import { DonateBlock as DonateBlockType, LinkGroup } from '@/payload-types'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { CTALinks } from '@/components/CTALinks'
import { TwoColumnLayout } from '@/components/TwoColumnLayout'
import { Media } from '@/components/Media'

export const DonateBlock = ({ direction, title, description, links, image }: DonateBlockType) => {
  return (
    <Container className="space-y-12">
      <TwoColumnLayout direction={direction ?? 'ltr'}>
        <>
          <Title heading="h2" text={title} />
          <Description text={description} />
          <CTALinks links={links ?? []} justify="start" />
        </>
        {image && typeof image === 'object' && <Media resource={image} className="rounded-lg" />}
      </TwoColumnLayout>
    </Container>
  )
}
