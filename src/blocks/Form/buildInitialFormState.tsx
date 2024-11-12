import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { PlayersArrayField } from './PlayersArray/types'

export const buildInitialFormState = (fields: (FormFieldBlock | PlayersArrayField)[]) => {
  return fields?.reduce((initialSchema, field) => {
    if (field.blockType === 'array' && 'fields' in field) {
      const emptyPlayer = field.fields.reduce(
        (acc, playerField) => ({
          ...acc,
          [playerField.name]: '',
        }),
        {},
      )

      return {
        ...initialSchema,
        players: [emptyPlayer],
      }
    }
    if (field.blockType === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'country') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'email') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'text') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'select') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'state') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'payment') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
  }, {})
}
