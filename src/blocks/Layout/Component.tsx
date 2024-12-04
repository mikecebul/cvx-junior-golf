import type { LayoutBlock as LayoutBlockType } from '@/payload-types'
import { RenderBlocks } from '../RenderBlocks'

export const LayoutBlock = ({ blocks }: LayoutBlockType) => {
  return <RenderBlocks blocks={blocks ?? []} nested />
}
