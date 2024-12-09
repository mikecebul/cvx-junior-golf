import Container from '@/components/Container'
import RichText from '@/components/RichText'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EventCardsBlock as EventsCardsBlockType } from '@/payload-types'
import { format } from 'date-fns'
import { CalendarIcon, MapPinIcon } from 'lucide-react'

export const EventCardsBlock = ({ eventCards }: EventsCardsBlockType) => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(eventCards) &&
          eventCards.length > 0 &&
          eventCards.map((event) => {
            if (typeof event !== 'object') {
              return null
            }
            return (
              <Card key={event.id} className="col-span-1 bg-green-50/50">
                <CardHeader className="">
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold pb-4">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="size-4" />
                      <span>{format(event.date, 'MMMM do, yyyy')}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPinIcon className="size-4" />
                      <span>{event.location}</span>
                    </span>
                  </div>
                  <RichText content={event.description} />
                </CardContent>
              </Card>
            )
          })}
      </div>
    </Container>
  )
}
