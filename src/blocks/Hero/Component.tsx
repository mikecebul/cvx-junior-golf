import { HeroHigh } from '@/components/Hero/HeroHigh'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import Container from '@/components/Container'
import type { Hero as HeroType, Page } from '@/payload-types'

type Props = Extract<Page['layout'][number], HeroType>

export async function HeroBlock({ type, highImpact, mediumImpact }: Props) {
  return (
    <Container>
      {type === 'highImpact' && !!highImpact ? (
        <HeroHigh {...highImpact} />
      ) : type === 'mediumImpact' && !!mediumImpact ? (
        <HeroMedium {...mediumImpact} />
      ) : null}
    </Container>
  )
}
