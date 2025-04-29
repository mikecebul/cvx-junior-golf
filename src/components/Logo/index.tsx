import { LandPlot } from 'lucide-react'
import Link from 'next/link'

export const Logo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="text-primary flex items-center">
      <LandPlot className="h-8 w-8 shrink-0" />
      <p className="ml-2 max-w-2xs text-xl font-bold text-balance">{name}</p>
    </Link>
  )
}
export const SheetLogo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="mt-8 flex flex-col items-center justify-center gap-2">
      <LandPlot className="text-primary h-8 w-8 shrink-0" />
      <span className="text-primary text-center text-xl font-bold text-balance">{name}</span>
    </Link>
  )
}

export const DashboardLogo = ({ name }: { name: string }) => {
  return <p className="text-white">{name}</p>
}
