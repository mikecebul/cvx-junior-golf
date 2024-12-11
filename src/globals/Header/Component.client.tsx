'use client'

import type { CompanyInfo, Header } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import { Logo } from '@/components/Logo'

export const HeaderClient = ({
  header,
  contact,
}: {
  header: Header
  contact: CompanyInfo['contact']
}) => {
  const navItems = header?.navItems || []
  const { phone } = contact || {}

  return (
    <header className="sticky top-0 z-40 flex w-full py-3 bg-background/50 backdrop-blur-sm overflow-clip">
      <div className="flex items-center w-full px-4 md:px-8 2xl:px-0 2xl:container">
        <Logo name={contact?.name ?? 'Charlevoix Junior Golf'} />
        <MainNav navItems={navItems} />
        <MobileNav navItems={navItems} name={contact?.name ?? 'Charlevoix Junior Golf'} />
        <div className="flex flex-col items-center text-lg xl:flex-row 2xl:space-x-2">
          <div
            className={cn(
              buttonVariants({ variant: 'text' }),
              'text-lg text-brand hidden xl:inline-flex',
            )}
          >
            <Icons.phone className="mr-2" size={20} />
            {phone}
          </div>
        </div>
      </div>
    </header>
  )
}
