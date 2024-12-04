import { FeatureCardsBlock as FeatureCardsBlockType } from '@/payload-types'
import { Icon } from '@/components/Icons/Icon'
import Container from '@/components/Container'

export function FeatureCardsBlock({ cards }: FeatureCardsBlockType) {
  return (
    <Container>
      <div className="grid gap-8 md:grid-cols-3">
        {cards?.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-start text-start gap-4 rounded-lg border p-6 bg-green-50/50"
          >
            <Icon name={card.icon ?? 'trophy'} className="h-12 w-12 text-green-600" />
            <div>
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
