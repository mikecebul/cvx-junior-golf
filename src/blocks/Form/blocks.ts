import type { Field, Block } from 'payload'

export const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}

export const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
}

export const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

export const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}
const Text: Block = {
  slug: 'text',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Text Fields',
    singular: 'Text',
  },
}
const Email: Block = {
  slug: 'email',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    width,
    required,
  ],
  labels: {
    plural: 'Email Fields',
    singular: 'Email',
  },
}

export const Price: Block = {
  slug: 'price',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'arrayField',
          type: 'text',
          label: 'Array Field Name to Watch',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'basePrice',
          type: 'number',
          label: 'Base Price',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'priceConditions',
      type: 'array',
      label: 'Price Conditions',
      fields: [
        {
          name: 'itemCount',
          type: 'number',
          label: 'Number of Items',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Additional Price',
          required: true,
        },
      ],
    },
    width,
  ],
  labels: {
    singular: 'Price',
    plural: 'Price Fields',
  },
}

export const DateOfBirth: Block = {
  slug: 'dateOfBirth',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          label: 'Default Value',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Date of Birth Fields',
    singular: 'Date of Birth',
  },
}

export const ArrayBlock: Block = {
  slug: 'array',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label Plural',
          required: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'labelSingular',
          type: 'text',
          label: 'Label Singular',
          required: true,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          defaultValue: 100,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'minRows',
          type: 'number',
          label: 'Minimum Rows',
          required: true,
          defaultValue: 1,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'maxRows',
          type: 'number',
          label: 'Maximum Rows',
          required: true,
          defaultValue: 4,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      type: 'blocks',
      name: 'fields',
      label: 'Fields',
      blocks: [Text, Email, DateOfBirth],
    },
  ],
}

