import { cn } from '@/utilities/cn'

export function HeroMedium({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="mx-auto flex flex-col justify-center max-w-prose text-left text-pretty lg:text-center gap-4">
      <div>
        {/* {!!subtitle && <Subtitle text={subtitle} />} */}
        {!!title && <Title text={title} />}
      </div>
      {!!description && <Description text={description} />}
    </div>
  )
}

export const Subtitle = ({ text }: { text: string }) => {
  return (
    <h3 className="text-base font-semibold leading-7 capitalize text-brand max-w-prose">{text}</h3>
  )
}
export const Title = ({
  text,
  className,
  heading = 'h2',
}: {
  text: string
  className?: string
  heading?: 'h1' | 'h2'
}) => {
  if (heading === 'h1') {
    return (
      <h1
        className={cn(
          'text-6xl md:text-7xl font-bold tracking-tight text-balance max-w-prose',
          className,
        )}
      >
        {text}
      </h1>
    )
  }
  if (heading === 'h2') {
    return (
      <h2
        className={cn(
          'text-5xl font-bold tracking-tight text-balance max-w-prose',
          className,
        )}
      >
        {text}
      </h2>
    )
  }
}
export const Description = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className={cn('text-lg leading-7 text-muted-foreground max-w-prose text-pretty', className)}>
      {text}
    </p>
  )
}
