import { cn } from '@/utilities/cn'
import { LandPlot } from 'lucide-react'
import Link from 'next/link'

export const Logo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="flex items-center">
      <LandPlot className="h-8 w-8 shrink-0 text-primary" />
      <p className="ml-2 text-balance text-xl font-bold text-primary">{name}</p>
    </Link>
  )
}
export const SheetLogo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="mt-8 flex flex-col items-center justify-center gap-2">
      <LandPlot className="h-8 w-8 shrink-0 text-primary" />
      <span className="text-balance text-center text-xl font-bold text-primary">{name}</span>
    </Link>
  )
}
