import type { Payload, SendEmailOptions } from 'payload'

type EmailRecipient = NonNullable<SendEmailOptions['to']>
type RecipientList = SendEmailOptions['bcc'] | SendEmailOptions['cc'] | SendEmailOptions['to']

type SendEmailSequentiallyArgs = {
  email: SendEmailOptions
  payload: Payload
}

const splitCommaSeparatedAddresses = (addresses: string): string[] => {
  const parts: string[] = []
  let current = ''
  let quote: string | null = null
  let angleDepth = 0

  for (const char of addresses) {
    if ((char === '"' || char === "'") && angleDepth === 0) {
      quote = quote === char ? null : quote ?? char
    }

    if (!quote) {
      if (char === '<') angleDepth += 1
      if (char === '>') angleDepth = Math.max(0, angleDepth - 1)

      if (char === ',' && angleDepth === 0) {
        const trimmed = current.trim()
        if (trimmed) parts.push(trimmed)
        current = ''
        continue
      }
    }

    current += char
  }

  const trimmed = current.trim()
  if (trimmed) parts.push(trimmed)

  return parts
}

const getRecipients = (recipients: RecipientList): EmailRecipient[] => {
  if (!recipients) return []

  if (typeof recipients === 'string') {
    return splitCommaSeparatedAddresses(recipients)
  }

  if (Array.isArray(recipients)) {
    return recipients.flatMap((recipient) =>
      typeof recipient === 'string' ? splitCommaSeparatedAddresses(recipient) : recipient,
    )
  }

  return [recipients]
}

export const sendEmailSequentially = async ({ email, payload }: SendEmailSequentiallyArgs) => {
  const recipients = [
    ...getRecipients(email.to),
    ...getRecipients(email.cc),
    ...getRecipients(email.bcc),
  ]

  if (recipients.length <= 1) {
    return payload.sendEmail(email)
  }

  for (const recipient of recipients) {
    await payload.sendEmail({
      ...email,
      bcc: undefined,
      cc: undefined,
      to: recipient,
    })
  }
}
