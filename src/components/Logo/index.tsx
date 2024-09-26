import { LandPlot } from "lucide-react"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <LandPlot className="h-8 w-8 text-primary" />
      <span className="ml-2 text-xl font-bold text-primary flex-wrap md:flex-nowrap">Charlevoix Junior Golf</span>
    </Link>
  )
}
