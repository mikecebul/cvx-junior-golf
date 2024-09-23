import { Block } from 'payload'
import { Hero } from '@/blocks/Hero/config'

export const schedule: Block = {
  slug: 'schedule',
  interfaceName: 'ScheduleBlock',
  fields: [
    {
      name: 'hero',
      type: 'blocks',
      blocks: [Hero],
      maxRows: 1,
      admin: {
        description: 'Only use Medium Impact Hero.',
      },
    },
    {
      name: 'scheduleItems',
      type: 'relationship',
      relationTo: 'schedules',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Select up to 3 schedule items to display',
      },
    },
  ],
}