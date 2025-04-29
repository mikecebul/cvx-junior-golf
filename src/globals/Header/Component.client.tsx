'use client'

import type { CompanyInfo, Header } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import { DashboardLogo, Logo } from '@/components/Logo'
import Container from '@/components/Container'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { baseUrl } from '@/utilities/baseUrl'

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
    <header className="bg-background/50 sticky top-0 z-40 flex w-full flex-col overflow-clip backdrop-blur-xs">
      <PayloadAdminBar
        cmsURL={baseUrl}
        collectionSlug="pages"
        logo={<DashboardLogo name={'Dashboard'} />}
        classNames={{
          logout: 'mr-8',
          logo: 'ml-8 text-white',
        }}
        className="static!"
      />
      <div className="flex w-full items-center px-4 py-3 md:px-8 2xl:container 2xl:mx-auto">
        <Logo name={companyName ?? 'Charlevoix Junior Golf'} />
        <MainNav navItems={navItems} />
        <MobileNav navItems={navItems} companyName={companyName ?? 'Charlevoix Junior Golf'} />
        <div className="flex flex-col items-center text-lg xl:flex-row 2xl:space-x-2">
          <div
            className={cn(
              buttonVariants({ variant: 'text' }),
              'text-brand hidden pr-0 text-lg xl:inline-flex',
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
