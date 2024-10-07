import { LandPlot } from 'lucide-react'

const Graphic = () => {
  return (
    <div className="flex justify-center items-center w-72">
      <LandPlot strokeWidth={2.2} className="size-16 text-primary shrink-0" />
      <span className="ml-4 text-4xl font-extrabold text-primary flex-wrap md:flex-nowrap">
        Charlevoix Junior Golf
      </span>
    </div>
  )
}

export default Graphic
