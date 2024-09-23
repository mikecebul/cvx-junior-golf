import Container from "@/components/Container"
import { CMSLink } from "@/components/Link"
import { HowItWorksBlock as HowItWorksBlockType } from "@/payload-types"

const HowItWorksBlock = ({ title, description, links }: HowItWorksBlockType) => {
  return (
    <Container>
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{title}</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
          {links != null &&
            links.map(({ link, id }, index) => (
              <CMSLink
                key={id}
                {...link}
                size="xl"
                appearance={index === 0 ? 'brand' : link.appearance}
                className="min-w-full rounded-lg xl:flex lg:min-w-64"
              />
            ))}
        </div>
      </div>
    </Container>
  )
}

export default HowItWorksBlock