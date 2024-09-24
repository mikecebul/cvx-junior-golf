import React, { FC, Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import { AboutUsBlock } from './AboutUs/Component'
import { LinksBlock } from './Links/Component'
import HowItWorksBlock from './HowItWorks/Component'
import { HistoryBlock } from './History/Component'
import { EventsBlock } from './Events/Component'
import { ResourcesBlock } from './Resources/Component'
const blockComponents = {
  hero: HeroBlock,
  aboutUs: AboutUsBlock,
  linksBlock: LinksBlock,
  events: EventsBlock,
  howItWorks: HowItWorksBlock,
  history: HistoryBlock,
  resources: ResourcesBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
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
                <div className="" key={index}>
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
