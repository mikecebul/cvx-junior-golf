import type { Landscape, RichTextBlock } from '@/payload-types'

export type SanitizedImage = {
  image: Landscape
  id: string
}

export const imagesAsLandscapes = (images: RichTextBlock['images']): Landscape[] => {
  const isLandscape = (item: any): item is Landscape => {
    return typeof item === 'object' && item !== null && 'url' in item
  }

  if (Array.isArray(images)) {
    return images.filter(isLandscape)
  }

  return []
}
