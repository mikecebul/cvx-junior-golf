import Container from "@/components/Container"
import { Description, Title } from "@/components/Hero/HeroMedium"
import { CMSLink } from "@/components/Link"
import { HowItWorksBlock as HowItWorksBlockType } from "@/payload-types"

const HowItWorksBlock = ({ title, description, links }: HowItWorksBlockType) => {
  return (
    <Container>
      <div className="grid items-center gap-12 px-4 md:px-6 xl:grid-cols-2">
        <div className="flex flex-col gap-4">
          {title && (
            <Title
              heading="h2"
              text={title}
            />
          )}
          {description && (
            <Description
              text={description}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 xl:justify-end">
          {links != null &&
            links.map(({ link, id }, index) => (
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