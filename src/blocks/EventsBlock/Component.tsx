import Container from "@/components/Container"
import { HeroMedium } from "@/components/Hero/HeroMedium"
import { EventsBlock as EventsBlockType } from "@/payload-types"
import Image from "next/image"
import { format } from 'date-fns'
import { image } from "framer-motion/client"

export const EventsBlock = ({ title, description, image, eventItems }: EventsBlockType) => {

  return (
    <Container>
      {title && (
        <HeroMedium
          title={title}
          description={description}
        />
      )}
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:py-0 lg:grid-cols-2 lg:gap-12">
        {!!image && typeof image === 'object' && (
          <Image
            src={image.url ?? "/placeholder.svg"}
            alt={image.alt ?? "Events"}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            width="550"
            height="310"
          />
        )}
        <div className="flex flex-col justify-center space-y-4">
          <ul className="grid gap-6">
            {Array.isArray(eventItems) && eventItems.length > 0 &&
              (
                eventItems.map((item) => {
                  if (typeof item !== 'object') {
                    return null
                  }
                  return (
                    <li key={item.id} className="bg-background rounded-lg border p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          <p className="text-muted-foreground">{format(item.date, 'MMMM do, yyyy')}</p>
                          <p className="text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
              )}
          </ul>
        </div>
      </div>
    </Container>
  )
}
