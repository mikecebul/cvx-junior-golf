import { BeforeEmail, FieldsConfig, HandlePayment } from '@payloadcms/plugin-form-builder/types'
import { CollectionConfig, Field } from 'payload'

export type FieldsOverride = (args: { defaultFields: Field[] }) => Field

export type FormBuilderPluginConfig = {
  beforeEmail?: BeforeEmail
  /**
   * Set a default email address to send form submissions to if no email is provided in the form configuration
   * Falls back to the defaultFromAddress in the email configuration
   */
  defaultToEmail?: string
  fields?: FieldsConfig
  formOverrides?: { fields?: FieldsOverride } & Partial<Omit<CollectionConfig, 'fields'>>
  formSubmissionOverrides?: { fields?: FieldsOverride } & Partial<Omit<CollectionConfig, 'fields'>>
  handlePayment?: HandlePayment
  redirectRelationships?: string[]
}
