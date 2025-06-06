import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data?.submissionData as Record<string, any[]>

  // Return early if no form data
  if (!formData) {
    return <div>No submission data available</div>
  }

  const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))

  return (
    <div className="space-y-6">
      {arrayFields.map(([fieldName, items]) => (
        <div key={fieldName}>
          <h2 className="mb-3 text-2xl font-bold capitalize">{fieldName}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
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
                        <p key={key} className="">
                          <span className="capitalize">{key}</span>: {key.toLowerCase().includes('birthdate') && value ? format(new Date(value as string), 'MMMM d, yyyy') : (value as string)}
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
