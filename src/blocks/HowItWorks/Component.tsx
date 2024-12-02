import Container from '@/components/Container'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { CMSLink } from '@/components/Link'
import { HowItWorksBlock as HowItWorksBlockType } from '@/payload-types'
import { Trophy } from 'lucide-react'

const HowItWorksBlock = ({ title, description, links }: HowItWorksBlockType) => {
  return (
    <Container>
      <div className="grid items-center gap-12 px-4 md:px-6 xl:grid-cols-2 max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center rounded-full px-4 py-1 text-sm font-medium bg-green-50 text-green-700">
            <Trophy className="mr-1 h-4 w-4" />
            Junior Golf Program
          </div>
          {title && <Title heading="h2" text={title} />}
          {description && <Description text={description} />}
        </div>
        <div className="flex flex-wrap gap-2 xl:justify-center">
          {links != null &&
            links.map(({ link, id }) => (
              <CMSLink
                key={id}
                {...link}
                size="xl"
                appearance={link.appearance === 'default' ? 'brand' : 'brandOutline'}
                className=""
              />
            ))}
        </div>
      </div>
    </Container>
  )
}

export default HowItWorksBlock
