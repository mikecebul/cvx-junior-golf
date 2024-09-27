import React, { FC, Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import { LinksBlock } from './Links/Component'
import HowItWorksBlock from './HowItWorks/Component'
import { HistoryBlock } from './History/Component'
import { EventsBlock } from './EventsBlock/Component'
import { ResourcesBlock } from './Resources/Component'
import { RichTextBlock } from './RichText/Component'
import { EventsPageBlock } from './EventsPage/Component'
import { DonateBlock } from './Donate/Component'
import { FormBlock } from './Form/Component'

const blockComponents = {
  hero: HeroBlock,
  richText: RichTextBlock,
  linksBlock: LinksBlock,
  events: EventsBlock,
  howItWorks: HowItWorksBlock,
  history: HistoryBlock,
  resources: ResourcesBlock,
  eventsPage: EventsPageBlock,
  donate: DonateBlock,
  formBlock: FormBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][number][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
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
