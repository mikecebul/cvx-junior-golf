import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { LinksBlock } from './Links/Component'
import { EventsBlock } from './EventsBlock/Component'
import { RichTextBlock } from './RichText/Component'
import { EventsPageBlock } from './EventsPage/Component'
import { FormBlock } from './Form/Component'
import { MediaBlock } from './MediaBlock/Component'
import { EventCardsBlock } from './EventCards/Component'
import { FeatureCardsBlock } from './FeatureCards/Component'
import { LayoutBlock } from './Layout/Component'
import { TwoColumnLayoutBlock } from './TwoColumnLayout/Component'
import { NewTwoColumnLayoutBlock } from './NewTwoColumnLayout/Component'

const blockComponents = {
  richText: RichTextBlock,
  linksBlock: LinksBlock,
  events: EventsBlock,
  eventsPage: EventsPageBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  eventCards: EventCardsBlock,
  featureCards: FeatureCardsBlock,
  twoColumnLayout: TwoColumnLayoutBlock,
  newTwoColumnLayout: NewTwoColumnLayoutBlock,
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
