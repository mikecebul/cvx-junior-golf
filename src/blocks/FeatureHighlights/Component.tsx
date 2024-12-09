import { FeatureHighlightsBlock as FeatureHighlightsType } from '@/payload-types'
import Container from '@/components/Container'
import { Icon } from '@/components/Icons/Icon'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { CTALinks } from '@/components/CTALinks'
import { TwoColumnLayout } from '@/components/TwoColumnLayout'
import { Media } from '@/components/Media'

export function FeatureHighlightsBlock({
  highlights,
  title,
  description,
  links,
  direction,
  image,
}: FeatureHighlightsType) {
  return (
    <Container className="space-y-12">
      <TwoColumnLayout direction={direction ?? 'ltr'}>
        <>
          <Title heading="h2" text={title ?? ''} />
          <Description text={description ?? ''} />
          <CTALinks links={links ?? []} justify="start" />
        </>
        {image && typeof image === 'object' && <Media resource={image} className="rounded-lg" />}
      </TwoColumnLayout>

      <div className="grid gap-8 md:grid-cols-3">
        {highlights?.map((highlight) => (
          <div
            key={highlight.id}
            className="flex flex-col items-start text-start gap-4 rounded-lg border p-6 bg-green-50/50"
          >
            <Icon name={highlight.icon ?? 'trophy'} className="h-12 w-12 text-green-600" />
            <div>
              <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
              <p className="text-sm text-muted-foreground">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
