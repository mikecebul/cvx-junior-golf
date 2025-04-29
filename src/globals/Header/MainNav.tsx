'use client'

import { cn } from '@/utilities/cn'
import { isActiveRoute } from '@/utilities/isActiveRoute'
import { usePathname } from 'next/navigation'
import type { NavItem } from './MobileNav'
import { CMSLink } from '@/components/Link'

export function MainNav({ navItems }: { navItems: NavItem[] }) {
  const currentPathName = usePathname()

  return (
    <div className="flex-1">
      <div className="hidden justify-center gap-8 px-8 lg:flex lg:flex-wrap">
        {navItems.map(({ link }, i) => {
          const slug =
            typeof link.reference?.value === 'object'
              ? link.reference?.relationTo === 'pages' &&
                typeof link.reference.value.slug === 'string'
                ? link.reference.value.slug
                : link.reference?.relationTo === 'media' &&
                    typeof link.reference.value.url === 'string'
                  ? link.reference.value.url
                  : ''
              : ''
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="nav"
              className={cn('', {
                'border-b-brand border-opacity-100 text-brand rounded-br-lg rounded-bl-lg border-b-2':
                  isActiveRoute(currentPathName as string, slug),
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
