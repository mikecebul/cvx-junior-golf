import Container from "@/components/Container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EventsPageBlock as EventsPageBlockType } from "@/payload-types"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { format } from 'date-fns'

export const EventsPageBlock = ({ title, events, announcements }: EventsPageBlockType) => {
  return (
    <Container className="2xl:max-w-full">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
        <div className="2xl:pl-16">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {!!events && events?.map((event) => {
              if (typeof event !== 'object') return null
              return (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="size-4" />
                        <span>{format(event.date, 'MMMM do, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="size-4" />
                        <span>Charlevoix Golf Club</span>
                      </div>
                    </CardDescription>
                    <CardContent className="px-0">
                      <p className="text-sm">Players will compete in a 9-hole tournament following a brief group lesson. Points earned contribute to the season standings, with prizes for top performers and most improved. Open to ages 7-15. See you on the course!</p>
                    </CardContent>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
        <div className="md:pl-8 2xl:pr-16">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          {!!announcements && announcements?.map((announcement) => {
            if (typeof announcement !== 'object') return null
            return (
              <Card key={announcement.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose leading-6">
                    <p>{announcement.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
