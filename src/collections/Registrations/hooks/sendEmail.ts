import type { CollectionBeforeChangeHook } from 'payload'

import type { FormBuilderPluginConfig } from '../types'

import { serializeLexical } from '@/plugins/stripe/webhooks/lexical/serializeLexical'
import { replaceDoubleCurlys } from '@/plugins/stripe/webhooks/lexical/replaceDoubleCurlys'
import { Email, FormattedEmail } from '@payloadcms/plugin-form-builder/types'

type BeforeChangeParams = Parameters<CollectionBeforeChangeHook>[0]

export const sendEmail = async (
  beforeChangeParameters: BeforeChangeParams,
  formConfig: FormBuilderPluginConfig,
): Promise<BeforeChangeParams['data']> => {
  const { data, operation, req } = beforeChangeParameters

  if (operation === 'create') {
    const {
      data: { id: formSubmissionID },
      req: { locale, payload },
    } = beforeChangeParameters

    const { form: formID, submissionData } = data || {}

    const { beforeEmail, defaultToEmail } = formConfig || {}

    try {
      const form = await payload.findByID({
        id: formID,
        collection: 'forms',
        locale,
        req,
      })

      const emails = form.emails as Email[]

      if (emails && emails.length) {
        const formattedEmails: FormattedEmail[] = await Promise.all(
          emails.map(async (email: Email): Promise<FormattedEmail> => {
            const {
              bcc: emailBCC,
              cc: emailCC,
              emailFrom,
              emailTo: emailToFromConfig,
              message,
              replyTo: emailReplyTo,
              subject,
            } = email

            const emailTo = emailToFromConfig || defaultToEmail || payload.email.defaultFromAddress

            const to = replaceDoubleCurlys(emailTo, submissionData)
            const cc = emailCC ? replaceDoubleCurlys(emailCC, submissionData) : ''
            const bcc = emailBCC ? replaceDoubleCurlys(emailBCC, submissionData) : ''
            const from = replaceDoubleCurlys(emailFrom, submissionData)
            const replyTo = replaceDoubleCurlys(emailReplyTo || emailFrom, submissionData)

            const serializedMessage = await serializeLexical(message, submissionData)

            return {
              bcc,
              cc,
              from,
              html: `<div>${serializedMessage}</div>`,
              replyTo,
              subject: replaceDoubleCurlys(subject, submissionData),
              to,
            }
          }),
        )

        let emailsToSend = formattedEmails

        if (typeof beforeEmail === 'function') {
          emailsToSend = await beforeEmail(formattedEmails, beforeChangeParameters)
        }

        await Promise.all(
          emailsToSend.map(async (email) => {
            const { to } = email
            try {
              const emailPromise = await payload.sendEmail(email)
              return emailPromise
            } catch (err: unknown) {
              payload.logger.error({
                err,
                msg: `Error while sending email to address: ${to}. Email not sent.`,
              })
            }
          }),
        )
      } else {
        payload.logger.info({ msg: 'No emails to send.' })
      }
    } catch (err: unknown) {
      const msg = `Error while sending one or more emails in form submission id: ${formSubmissionID}.`
      payload.logger.error({ err, msg })
    }
  }

  return data
}
