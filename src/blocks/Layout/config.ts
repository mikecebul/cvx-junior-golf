import { Block } from 'payload'
import { FeatureCards } from '../FeatureCards/config'
import { EventCards } from '../EventCards/config'
import { TwoColumnLayout } from '../TwoColumnLayout/config'

export const Layout: Block = {
  slug: 'layout',
  interfaceName: 'LayoutBlock',
  labels: {
    singular: 'Multi Row Layout',
    plural: 'Multi Row Layouts',
  },
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      maxRows: 2,
      blocks: [TwoColumnLayout, FeatureCards, EventCards],
    },
  ],
}
