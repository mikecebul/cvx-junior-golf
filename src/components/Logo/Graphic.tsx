import { LandPlot } from 'lucide-react'

const Graphic = () => {
  return (
    <div className="flex justify-center items-end w-full">
      <LandPlot className="size-12 text-primary" />
      <span className="ml-4 text-4xl font-extrabold text-primary flex-wrap md:flex-nowrap">
        Charlevoix Junior Golf
      </span>
    </div>
  )
}

export default Graphic
