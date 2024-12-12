import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { ArrayBlockConfig } from './Array/types'
import { PriceField } from './Price/types'
import { DateOfBirthField } from './DateOfBirth/type'

export const buildInitialFormState = (
  fields: (FormFieldBlock | ArrayBlockConfig | PriceField | DateOfBirthField)[],
) => {
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
        [field.name]: field.minRows > 0 ? [emptyItem] : [],
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
    if (field.blockType === 'dateOfBirth') {
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
    if (field.blockType === 'price') {
      return {
        ...initialSchema,
        [field.name]: field.basePrice || 0,
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
