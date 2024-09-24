import { linkGroup } from "@/fields/link/linkGroup";
import { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: {
    singular: 'Resource',
    plural: 'Resources',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}