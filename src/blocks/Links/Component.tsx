import { CardGrid } from '@/components/Cards/CardGrid'
import { LinkCard } from '@/components/Cards/LinkCard'
import { VideoCard } from '@/components/Cards/VideoCard'
import Container from '@/components/Container'
import { MotionStaggeredChild } from '@/components/framer/MotionStaggeredChild'
import { MotionStaggerChildren } from '@/components/framer/MotionStaggeredChildren'
import { GridSVG } from '@/components/GridSVG'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import type { LinksBlock as LinksBlockType } from '@/payload-types'

export const LinksBlock = ({ title, description, linkCards }: LinksBlockType) => {
  return (
    <Container>
      <GridSVG />
      <HeroMedium title={title || undefined} description={description || undefined} />
      {!!linkCards && linkCards.length > 0 && (
        <MotionStaggerChildren>
          <CardGrid>
            {linkCards.map((card) => (
              <MotionStaggeredChild key={card.id}>
                {card.linkType === 'video' && <VideoCard card={card} />}
                {card.linkType === 'link' && <LinkCard card={card} />}
              </MotionStaggeredChild>
            ))}
          </CardGrid>
        </MotionStaggerChildren>
      )}
    </Container>
  )
}
