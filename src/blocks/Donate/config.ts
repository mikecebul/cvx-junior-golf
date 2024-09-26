import { link } from "@/fields/link";
import { Block } from "payload";

export const Donate: Block = {
  slug: 'donate',
  interfaceName: 'DonateBlock',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    link(),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'landscapes',
    },
  ],
}