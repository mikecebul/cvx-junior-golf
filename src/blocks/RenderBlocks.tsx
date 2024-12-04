import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import { LinksBlock } from './Links/Component'
import HowItWorksBlock from './HowItWorks/Component'
import { HistoryBlock } from './History/Component'
import { EventsBlock } from './EventsBlock/Component'
import { RichTextBlock } from './RichText/Component'
import { EventsPageBlock } from './EventsPage/Component'
import { DonateBlock } from './Donate/Component'
import { FormBlock } from './Form/Component'
import { MediaBlock } from './MediaBlock/Component'
import { FeatureHighlightsBlock } from './FeatureHighlights/Component'
import { EventCardsBlock } from './EventCards/Component'
import { FeatureCardsBlock } from './FeatureCards/Component'
import { LayoutBlock } from './Layout/Component'
import { TwoColumnLayoutBlock } from './TwoColumnLayout/Component'
const blockComponents = {
  hero: HeroBlock,
  richText: RichTextBlock,
  linksBlock: LinksBlock,
  events: EventsBlock,
  howItWorks: HowItWorksBlock,
  history: HistoryBlock,
  eventsPage: EventsPageBlock,
  donate: DonateBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  featureHighlights: FeatureHighlightsBlock,
  eventCards: EventCardsBlock,
  featureCards: FeatureCardsBlock,
  twoColumnLayout: TwoColumnLayoutBlock,
  layout: LayoutBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][number][]
  nested?: boolean
}> = (props) => {
  const { blocks, nested = false } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return nested ? (
                <div key={index} className="pt-12 first:pt-0">
                  <Block {...(block as any)} />
                </div>
              ) : (
                <div key={index} className="py-24 last:pb-48">
                  <Block {...(block as any)} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
