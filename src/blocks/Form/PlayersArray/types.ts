import { BlockConfig } from '@payloadcms/plugin-form-builder/types'

export interface PlayerField {
  name: string
  label: string
  required?: boolean
  width?: string
}

export interface PlayersArrayField extends BlockConfig {
  blockType: 'array'
  name: string
  label: string
  fields: PlayerField[]
}
