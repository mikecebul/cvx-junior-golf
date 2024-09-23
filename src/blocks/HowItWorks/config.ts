import { linkGroup } from "@/fields/link/linkGroup"
import { Block } from "payload"

export const howItWorks: Block = {
  slug: 'how-it-works',
  interfaceName: 'HowItWorksBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}