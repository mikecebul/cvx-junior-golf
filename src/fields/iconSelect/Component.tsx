'use client'

import { lucideIcons } from '@/components/Icons'
import { SelectField, useField } from '@payloadcms/ui'
import { Icon } from '@/components/Icons/Icon'
import type { Option, SelectFieldClientComponent } from 'payload'

const IconSelect: SelectFieldClientComponent = ({ path, validate }) => {
  const { setValue, value } = useField<string>({ path })
  const options = lucideIcons.map((icon) => ({
    label: icon.label,
    value: icon.value,
  }))
  const onChange = (option: Option | Option[]) => {
    setValue(option)
  }

  return (
    <div>
      <label className="field-label">Icon Select</label>
      <div className="flex gap-4 items-center">
        <Icon name={value} className="shrink-0" />
        <div className="w-full sm:w-auto min-w-64">
          <SelectField
            path={path}
            field={{
              name: path,
              hasMany: false,
              options,
            }}
            value={value}
            onChange={onChange}
            validate={validate}
          />
        </div>
      </div>
    </div>
  )
}

export default IconSelect
