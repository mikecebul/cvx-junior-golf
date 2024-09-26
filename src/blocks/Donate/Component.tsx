import Container from "@/components/Container";
import { DonateBlock as DonateBlockType } from "@/payload-types";
import { Description, Title } from "@/components/Hero/HeroMedium";
import { CMSLink } from "@/components/Link";
import Image from "next/image";

export const DonateBlock = ({
  title,
  description,
  link,
  image,
}: DonateBlockType) => {
  return (
    <Container>
      <div className="grid lg:grid-cols-2 lg:gap-24 lg:items-center">
        {image && typeof image === 'object' && <Image src={image.url ?? '/placeholder.png'} alt={image.alt}
          width={960}
          height={640}
          className="hidden lg:block rounded-lg"
        />}
        <div className="flex flex-col gap-12 justify-center">
          <div>
            {title && <Title heading="h2" text={title} />}
            {description && <Description text={description} />}
          </div>
          <div className="flex">
            {link && <CMSLink {...link} appearance="brand" size="xl" />}
          </div>
        </div>
      </div>
    </Container>
  )
}