import Container from '@/components/Container'
import { RichText } from '@/components/RichText'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EventCardsBlock as EventsCardsBlockType } from '@/payload-types'
import { format } from 'date-fns'
import { CalendarIcon, MapPinIcon } from 'lucide-react'

export const EventCardsBlock = ({ eventCards }: EventsCardsBlockType) => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(eventCards) &&
          eventCards.length > 0 &&
          eventCards.map((event) => {
            if (typeof event !== 'object') {
              return null
            }
            return (
              <Card key={event.id} className="col-span-1">
                <CardHeader className="">
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <CardDescription className="text-base">
                    <span className="flex flex-col">
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="size-4" />
                        <span>{format(event.date, 'MMMM do, yyyy')}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPinIcon className="size-4" />
                        <span>{event.location}</span>
                      </span>
                    </span>
                  </CardDescription>
                </CardContent>
                <CardContent className="">
                  <RichText data={event.description} paragraphClassName="" />
                </CardContent>
              </Card>
            )
          })}
      </div>
    </Container>
  )
}
