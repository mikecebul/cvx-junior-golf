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
  const { phone, name: companyName } = contact || {}

  return (
    <header className="sticky top-0 z-40 flex w-full overflow-clip bg-background/50 py-3 backdrop-blur-sm">
      <div className="flex w-full items-center px-4 2xl:container md:px-8 2xl:px-0">
        <Logo name={companyName ?? 'Charlevoix Junior Golf'} />
        <MainNav navItems={navItems} />
        <MobileNav navItems={navItems} companyName={companyName ?? 'Charlevoix Junior Golf'} />
        <div className="flex flex-col items-center text-lg xl:flex-row 2xl:space-x-2">
          <div
            className={cn(
              buttonVariants({ variant: 'text' }),
              'hidden text-lg text-brand xl:inline-flex',
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
