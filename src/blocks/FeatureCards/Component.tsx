import { FeatureCardsBlock as FeatureCardsBlockType } from '@/payload-types'
import { Icon } from '@/components/Icons/Icon'
import Container from '@/components/Container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function FeatureCardsBlock({ cards }: FeatureCardsBlockType) {
  return (
    <Container>
      <div className="grid gap-12 md:grid-cols-3">
        {cards?.map((card) => (
          <Card
            key={card.id}
            className="flex flex-col items-start text-start rounded-lg border bg-card"
          >
            <CardHeader className="pb-0">
              <Icon name={card.icon ?? 'trophy'} className="h-12 w-12 text-green-600 mb-8 shrink-0" />
              <h3 className="font-bold text-lg">{card.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
