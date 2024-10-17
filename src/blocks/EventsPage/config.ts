import { Block } from 'payload'

export const EventsPage: Block = {
  slug: 'eventsPage',
  interfaceName: 'EventsPageBlock',
  labels: {
    singular: 'Events Page',
    plural: 'Events Pages',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'events',
      label: 'Events',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
    },
    {
      name: 'announcements',
      type: 'array',
      label: 'Announcements',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/EventsPage/RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
