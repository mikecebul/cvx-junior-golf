'use client'

import React, { useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCheckoutSession } from '@/plugins/stripe/createCheckoutSession'

const getPrice = (numPlayers: number) => {
  if (numPlayers === 1) return 75
  if (numPlayers === 2) return 125
  if (numPlayers === 3) return 150
  if (numPlayers === 4) return 175
  return 0
}

const StripeCheckoutLink: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { id } = useDocumentInfo()
  const relatedRegistrations = useFormFields(([fields]) => fields.relatedRegistrations)

  const handleGenerateClick = async () => {
    setLoading(true)
    setError(null)

    if (!id) {
      setError('Registration ID not found.')
      setLoading(false)
      return
    }

    const allRegistrationIds = [id as string, ...(relatedRegistrations.value as string[])]
    const price = getPrice(allRegistrationIds.length)

    const session = await createCheckoutSession(allRegistrationIds, price)

    if (session?.url) {
      setUrl(session.url)
    } else {
      setError('Failed to generate checkout link.')
    }
    setLoading(false)
  }

  const handleCopyClick = () => {
    if (url) {
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <div>
      <Label>Stripe Checkout Link</Label>
      <p className="mb-2 text-sm text-gray-500">The link is valid for 24 hours.</p>
      {url ? (
        <div className="flex items-center gap-2">
          <Input type="text" value={url} readOnly className="flex-grow" />
          <Button onClick={handleCopyClick}>Copy</Button>
        </div>
      ) : (
        <Button onClick={handleGenerateClick} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Stripe Checkout Link'}
        </Button>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  )
}

export default StripeCheckoutLink
