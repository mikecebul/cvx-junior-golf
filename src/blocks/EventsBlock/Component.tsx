import Container from "@/components/Container"
import { Description, Title } from "@/components/Hero/HeroMedium"
import { EventsBlock as EventsBlockType } from "@/payload-types"
import Image from "next/image"
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon } from "lucide-react"

export const EventsBlock = ({ title, description, image, eventItems }: EventsBlockType) => {

  return (
    <Container>
      <div className="space-y-12">
        {title && (
          <div className="flex flex-col gap-4">
            <Title
              heading="h2"
              text={title}
            />
            <Description
              text={description}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(eventItems) && eventItems.length > 0 &&
            eventItems.map((event) => {
              if (typeof event !== 'object') {
                return null
              }
              return (
                <Card key={event.id} className="col-span-1">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      <span className="flex flex-col gap-2">
                        <span className="flex items-center gap-2">
                          <CalendarIcon className="size-4" />
                          <span>{format(event.date, 'MMMM do, yyyy')}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPinIcon className="size-4" />
                          <span>Charlevoix Golf Club</span>
                        </span>
                      </span>
                    </CardDescription>
                    <CardContent className="p-0">
                      Players will compete in a 9-hole tournament following a brief group lesson. Points earned contribute to the season standings, with prizes for top performers and most improved. Open to ages 7-15. See you on the course!
                    </CardContent>
                  </CardHeader>
                </Card>
              )
            })
          }
        </div>
      </div>
    </Container>
  )
}
