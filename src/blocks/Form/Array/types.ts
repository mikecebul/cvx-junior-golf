import { BlockConfig } from '@payloadcms/plugin-form-builder/types'

export type ArrayEntryField = {
  blockType: 'text' | 'email' | 'dateOfBirth'
  name: string
  label: string
  required?: boolean
  width?: number
}

export interface ArrayBlockConfig extends BlockConfig {
  blockType: 'array'
  name: string
  label: string
  labelSingular: string
  minRows: number
  maxRows: number
  width?: number
  fields: ArrayEntryField[]
}
