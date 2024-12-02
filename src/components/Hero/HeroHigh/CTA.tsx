'use client'

import { CMSLink } from '@/components/Link'
import { track } from '@vercel/analytics/react'
import type { LinkGroup } from '@/payload-types'

export const CTA = ({ links }: { links: LinkGroup }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {links != null &&
        links.map(({ link, id }, index) => (
          <CMSLink
            key={id}
            {...link}
            size="xl"
            appearance={link.appearance === 'default' ? 'brand' : 'brandOutline'}
            onClick={() => {
              track('Hero CTA Clicked', {
                label: link.label,
              })
            }}
          />
        ))}
    </div>
  )
}
