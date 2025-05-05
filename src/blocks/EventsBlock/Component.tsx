import Container from '@/components/Container'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { EventsBlock as EventsBlockType } from '@/payload-types'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { CTALinks } from '@/components/CTALinks'
import { TwoColumnLayout } from '@/components/TwoColumnLayout'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

export const EventsBlock = ({
  title,
  description,
  eventItems,
  direction,
  links,
  image,
}: EventsBlockType) => {
  return (
    <Container className="space-y-12">
      <TwoColumnLayout direction={direction ?? 'ltr'}>
        <>
          <Title heading="h2" text={title} />
          <Description text={description} />
          <CTALinks links={links ?? []} />
        </>
        {image && typeof image === 'object' && <Media resource={image} className="rounded-lg" />}
      </TwoColumnLayout>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(eventItems) &&
          eventItems.length > 0 &&
          eventItems.map((event) => {
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
    </Container>
  )
}
