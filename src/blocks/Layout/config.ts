import { Block } from 'payload'
import { TwoColumnLayout } from '../TwoColumnLayout/config'
import { FeatureCards } from '../FeatureCards/config'
import { EventCards } from '../EventCards/config'

export const Layout: Block = {
  slug: 'layout',
  interfaceName: 'LayoutBlock',
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      maxRows: 2,
      blocks: [TwoColumnLayout, FeatureCards, EventCards],
    },
  ],
}
