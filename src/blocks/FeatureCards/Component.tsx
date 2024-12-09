import { FeatureCardsBlock as FeatureCardsBlockType } from '@/payload-types'
import { Icon } from '@/components/Icons/Icon'
import Container from '@/components/Container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function FeatureCardsBlock({ cards }: FeatureCardsBlockType) {
  return (
    <Container>
      <div className="grid gap-8 md:grid-cols-3">
        {cards?.map((card) => (
          <Card
            key={card.id}
            className="flex flex-col items-start text-start gap-4 rounded-lg border p-6 bg-card"
          >
            <CardHeader className="pb-0">
              <Icon name={card.icon ?? 'trophy'} className="h-12 w-12 text-green-600" />
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
