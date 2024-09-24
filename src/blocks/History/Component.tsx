import Container from "@/components/Container"
import { CMSLink } from "@/components/Link"
import { HistoryBlock as HistoryBlockType } from "@/payload-types"
import Image from "next/image"

export const HistoryBlock = ({ title, description, image, items, link }: HistoryBlockType) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        {!!image && typeof image === 'object' && (
          <Image
            src={image.url ?? "/placeholder.svg"}
            alt={image.alt ?? "History"}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            width="960"
            height="640"
          />
        )}
        <div className="flex flex-col justify-center space-y-4">
          <ul className="grid gap-6">
            {Array.isArray(items) && items.length > 0 && items.map((item) => (
              <li key={item.title}>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          {!!link && (
            <CMSLink {...link} />
          )}
        </div>
      </div>
    </Container>
  )
}
