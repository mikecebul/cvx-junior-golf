import React, { FC, Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import DonateBlock from './Donate/Component'
import { AboutUsBlock } from './AboutUs/Component'
import { LinksBlock } from './Links/Component'
import ScheduleBlock from './Schedule/Component'
import HowItWorksBlock from './HowItWorks/Component'

const blockComponents = {
  hero: HeroBlock,
  donate: DonateBlock,
  aboutUs: AboutUsBlock,
  linksBlock: LinksBlock,
  schedule: ScheduleBlock,
  howItWorks: HowItWorksBlock,
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
