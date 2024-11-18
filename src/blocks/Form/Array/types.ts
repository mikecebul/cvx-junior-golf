import { BlockConfig } from '@payloadcms/plugin-form-builder/types'

export interface ArrayItemField {
  name: string
  label: string
  required?: boolean
  width?: number
}

export interface ArrayField extends BlockConfig {
  blockType: 'array'
  name: string
  labelSingular: string
  labelPlural: string
  minRows: number
  maxRows: number
  width?: number
  fields: ArrayItemField[]
}