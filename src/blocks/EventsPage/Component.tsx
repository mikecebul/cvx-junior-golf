import Container from '@/components/Container'
import { Card, CardContent, CardDescriptionDiv, CardHeader, CardTitle } from '@/components/ui/card'
import { EventsPageBlock as EventsPageBlockType } from '@/payload-types'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'
import RichText from '@/components/RichText'

export const EventsPageBlock = ({ title, events, announcements }: EventsPageBlockType) => {
  return (
    <Container className="space-y-16">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {!!events &&
            events?.map((event) => {
              if (typeof event !== 'object') return null
              return (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescriptionDiv>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="size-4" />
                        <span>{format(event.date, 'MMMM do, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="size-4" />
                        <span>{event.location}</span>
                      </div>
                    </CardDescriptionDiv>
                    <CardContent className="px-0">
                      <div className="prose leading-6">
                        <RichText content={event.description} />
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              )
            })}
        </div>
      </div>
      {announcements && announcements.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {announcements?.map((announcement) => {
              if (typeof announcement !== 'object') return null
              return (
                <Card key={announcement.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose leading-6">
                      <RichText content={announcement.description} />
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
