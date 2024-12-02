import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data.formData as Record<string, any[]>

  const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))

  return (
    <div className="space-y-6">
      {arrayFields.map(([fieldName, items]) => (
        <div key={fieldName}>
          <h2 className="text-lg font-semibold mb-3 capitalize">{fieldName}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {/* Display name if available, otherwise skip */}
                    {item.firstName && item.lastName && `${item.firstName} ${item.lastName}`}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {Object.entries(item).map(
                    ([key, value]) =>
                      // Skip firstName and lastName as they're shown in the title
                      key !== 'firstName' &&
                      key !== 'lastName' && (
                        <p key={key} className="text-sm">
                          <span className="capitalize">{key}</span>: {value as string}
                        </p>
                      ),
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FormData