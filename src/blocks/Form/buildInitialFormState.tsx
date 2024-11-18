import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { ArrayField } from './Array/types'

export const buildInitialFormState = (fields: (FormFieldBlock | ArrayField)[]) => {
  return fields?.reduce((initialSchema, field) => {
    if (field.blockType === 'array' && 'fields' in field) {
      const emptyItem = field.fields.reduce(
        (acc, itemField) => ({
          ...acc,
          [itemField.name]: '',
        }),
        {},
      )

      return {
        ...initialSchema,
        [field.labelPlural]: field.minRows > 0 ? [emptyItem] : [],
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
