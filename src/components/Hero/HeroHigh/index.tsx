import type { Hero as HeroType } from '@/payload-types'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { TwoColumnLayout } from '@/components/TwoColumnLayout'
import { CTALinks } from '@/components/CTALinks'
import { Media } from '@/components/Media'

export type HeroHighProps = NonNullable<HeroType['highImpact']>

export async function HeroHigh({ title, description, direction, image, links }: HeroHighProps) {
  return (
    <TwoColumnLayout direction={direction ?? 'ltr'} breakpoint="lg">
      <>
        <Title heading="h1" className="" text={title} />
        <Description text={description} />
        <CTALinks links={links ?? []} justify="start" />
      </>
      {image && typeof image === 'object' && <Media resource={image} className="rounded-lg" />}
    </TwoColumnLayout>
  )
}
