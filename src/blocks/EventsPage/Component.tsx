import Container from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EventsPageBlock as EventsPageBlockType } from '@/payload-types'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Title } from '@/components/Hero/HeroMedium'
import { RichText } from '@/components/RichText'

export const EventsPageBlock = ({ title, eventCards, announcements }: EventsPageBlockType) => {
  return (
    <Container className="space-y-16">
      <div className="space-y-16">
        <Title text={title ?? 'Upcoming Events'} heading="h1" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
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
                    <RichText data={event.description} />
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </div>
      {announcements && announcements.length > 0 && (
        <div className="space-y-8">
          <Title text="Announcements" heading="h2" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {announcements?.map((announcement) => {
              if (typeof announcement !== 'object') return null
              return (
                <Card key={announcement.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      <RichText data={announcement.description} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </Container>
  )
}
