import { Hero } from '@/payload-types'
import { cn } from '@/utilities/cn'

export function HeroMedium(props: Hero['mediumImpact']) {
  const { subtitle, title, description } = props || {}
  return (
    <div className="mx-auto flex flex-col justify-center max-w-prose text-left text-pretty lg:text-center pb-16">
      {!!subtitle && <Subtitle text={subtitle} />}
      {!!title && <Title text={title} />}
      {!!description && <Description text={description} />}
    </div>
  )
}

export const Subtitle = ({ text }: { text: string }) => {
  return (
    <h3 className="text-base font-semibold leading-7 capitalize text-brand max-w-prose">{text}</h3>
  )
}
export const Title = ({ text, className, heading = 'h2' }: { text: string, className?: string, heading?: 'h1' | 'h2' }) => {
  const Heading = heading;
  if (heading === 'h1') {
    return (
      <Heading className={cn("text-7xl font-extrabold tracking-tight capitalize text-pretty max-w-prose", className)}>
        {text}
      </Heading>
    )
  }
  if (heading === 'h2') {
    return (
      <Heading className={cn("text-5xl font-extrabold tracking-tight capitalize text-pretty max-w-prose", className)}>
        {text}
      </Heading>
    )
  }
}
export const Description = ({ text, className }: { text: string, className?: string }) => {
  return (
    <p className={cn("pt-4 text-lg leading-7 text-muted-foreground max-w-prose text-pretty", className)}>{text}</p>
  )
}
