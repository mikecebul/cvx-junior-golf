import Image from 'next/image'
import type { CompanyInfo, Hero as HeroType } from '@/payload-types'
import { CMSLink } from '../Link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Title } from './HeroMedium'
import Container from '../Container'

type Props = NonNullable<HeroType['highImpact']>

export async function Hero({ title, description, image, links }: Props) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="flex flex-col mr-auto col-span-1 justify-center gap-8">
        <div className="flex flex-col gap-4">
          {title && <Title heading="h1" text={title} className="" />}
          <p className="max-w-xl text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-4 flex-wrap">
          {links != null &&
            links.map(({ link, id }, index) => (
              <CMSLink
                key={id}
                {...link}
                size="xl"
                appearance={link.appearance === 'default' ? 'brand' : 'brandOutline'}
              />
            ))}
        </div>
      </div>
      <div className="relative hidden col-span-1 lg:flex lg:justify-center lg:items-center">
        <div className="relative w-full aspect-[3/2]">
          {image != null && typeof image === 'object' && (
            <>
              <Image
                src={image.url ?? '/golf-hero.jpg'}
                alt={image.alt ?? 'Golfer swinging a golf club'}
                className="object-cover object-top rounded-lg"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              {/* {svg && <SVG />} */}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const SVG = () => {
  return (
    <span className="absolute -left-8 -bottom-8 -z-10 text-brand">
      <svg
        width="93"
        height="93"
        viewBox="0 0 93 93"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="2.5" cy="2.5" r="2.5" />
        <circle cx="2.5" cy="24.5" r="2.5" />
        <circle cx="2.5" cy="46.5" r="2.5" />
        <circle cx="2.5" cy="68.5" r="2.5" />
        <circle cx="2.5" cy="90.5" r="2.5" />
        <circle cx="24.5" cy="2.5" r="2.5" />
        <circle cx="24.5" cy="24.5" r="2.5" />
        <circle cx="24.5" cy="46.5" r="2.5" />
        <circle cx="24.5" cy="68.5" r="2.5" />
        <circle cx="24.5" cy="90.5" r="2.5" />
        <circle cx="46.5" cy="2.5" r="2.5" />
        <circle cx="46.5" cy="24.5" r="2.5" />
        <circle cx="46.5" cy="46.5" r="2.5" />
        <circle cx="46.5" cy="68.5" r="2.5" />
        <circle cx="46.5" cy="90.5" r="2.5" />
        <circle cx="68.5" cy="2.5" r="2.5" />
        <circle cx="68.5" cy="24.5" r="2.5" />
        <circle cx="68.5" cy="46.5" r="2.5" />
        <circle cx="68.5" cy="68.5" r="2.5" />
        <circle cx="68.5" cy="90.5" r="2.5" />
        <circle cx="90.5" cy="2.5" r="2.5" />
        <circle cx="90.5" cy="24.5" r="2.5" />
        <circle cx="90.5" cy="46.5" r="2.5" />
        <circle cx="90.5" cy="68.5" r="2.5" />
        <circle cx="90.5" cy="90.5" r="2.5" />
      </svg>
    </span>
  )
}
