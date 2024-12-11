import { LandPlot } from "lucide-react"
import Link from "next/link"

export const Logo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="flex items-center">
      <LandPlot className="h-8 w-8 text-primary shrink-0" />
      <p className="ml-2 text-xl font-bold text-primary text-balance">{name}</p>
    </Link>
  )
}
