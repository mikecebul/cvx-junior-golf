import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'

import { sentryPlugin } from '@payloadcms/plugin-sentry'
import * as Sentry from '@sentry/nextjs'

import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { S3_PLUGIN_CONFIG } from './plugins/s3'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  lexicalEditor,
  BlocksFeature,
  ParagraphFeature,
  LinkFields,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, TextFieldSingleValidation } from 'payload'
import { fileURLToPath } from 'url'

import { Pages } from './collections/Pages'
import Users from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL, GenerateImage } from '@payloadcms/plugin-seo/types'
import { Page } from 'src/payload-types'
import { CompanyInfo } from './globals/CompanyInfo/config'
import { superAdmin } from './access/superAdmin'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { MediaBlock } from './blocks/MediaBlock/config'
import { baseUrl } from './utilities/baseUrl'
import { ArrayBlock, DateOfBirth } from './blocks/Form/blocks'
import { checkoutSessionCompleted } from './plugins/stripe/webhooks/checkoutSessionCompleted'
import { revalidatePath } from 'next/cache'
import { editorOrHigher } from './access/editorOrHigher'
import { anyone } from './access/anyone'
import { adminOrSuperAdmin } from './access/adminOrSuperAdmin'
import { authenticated } from './access/authenticated'

import { format } from 'date-fns'
import Registrations from './collections/Registrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  if ('name' in doc) {
    return doc.name ? `${doc.name}` : 'Charlevoix County Junior Golf Association'
  }
  return doc?.title ? `${doc.title}` : 'Charlevoix County Junior Golf Association'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  if (!doc.slug) return baseUrl
  return `${baseUrl}/${doc.slug}`
}
const generateImage: GenerateImage<Page> = ({ doc }) => {
  if (typeof doc.meta?.metadata?.image === 'object' && doc.meta?.metadata?.image) {
    return doc.meta.metadata.image.url || '/golf-hero.jpg'
  }
  return '/golf-hero.jpg'
}

// Hook to create registrations when payment status is set to 'paid'
const createRegistrationsOnPayment = async ({ doc, previousDoc, req }) => {
  const prevStatus = previousDoc?.payment?.status
  const newStatus = doc?.payment?.status
  if (prevStatus === 'paid' || newStatus !== 'paid') return

  const players = Array.isArray(doc.submissionData?.players) ? doc.submissionData.players : []
  const parent =
    Array.isArray(doc.submissionData?.parents) && doc.submissionData.parents.length > 0
      ? doc.submissionData.parents[0]
      : {}
  const parentName =
    parent.firstName && parent.lastName ? `${parent.firstName} ${parent.lastName}` : undefined
  const parentPhone = parent.phone
  const parentEmail = parent.email
  const year = new Date().getFullYear()

  for (const player of players) {
    if (!player) continue
    const postalCode = player.postalCode || parent.postalCode || ''
    await req.payload.create({
      collection: 'registrations',
      data: {
        year,
        childFirstName: player.firstName || player.childFirstName,
        childLastName: player.lastName || player.childLastName,
        childBirthdate: player.birthdate || player.dob || player.childBirthdate,
        parentName,
        parentPhone,
        parentEmail,
        ethnicity: player.ethnicity || '',
        gender: player.gender || '',
        postalCode,
      },
    })
  }
}

export default buildConfig({
  admin: {
    avatar: 'default',
    components: {
      beforeDashboard: ['@/components/beforeDashboard/RegistrationCount'],
      afterDashboard: ['@/components/afterDashboard/Analytics'],
      afterNavLinks: ['@/components/afterNavLinks/LinkToAnalyticsDefaultRootView'],
      graphics: {
        Icon: '@/graphics/Icon',
        Logo: '@/components/Logo/Graphic',
      },
      views: {
        CustomRootView: {
          Component: '@/components/views/Analytics',
          path: '/analytics',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [{ url: '/favicon.ico' }],
      titleSuffix: ' | CVX Junior Golf',
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        ParagraphFeature(),
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        BlocksFeature({
          blocks: [MediaBlock],
        }),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
                validate: ((value, options) => {
                  if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                    return true // no validation needed, as no url should exist for internal links
                  }
                  return value ? true : 'URL is required'
                }) as TextFieldSingleValidation,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  collections: [Pages, Events, Media, Users, Registrations],
  cors: [baseUrl].filter(Boolean),
  csrf: [baseUrl].filter(Boolean),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL || 'info@cvxjrgolf.org',
    defaultFromName: 'Charlevoix County Junior Golf Association',
    apiKey: process.env.RESEND_API_KEY!,
  }),
  endpoints: [],
  globals: [Header, Footer, CompanyInfo],
  plugins: [
    importExportPlugin({
      collections: ['registrations', 'form-submissions'],
      overrideExportCollection: (collection) => {
        collection.admin.group = 'Admin'
        collection.upload.staticDir = path.resolve(dirname, 'uploads')
        return collection
      },
      disableJobsQueue: true,
    }),
    sentryPlugin({
      options: {
        captureErrors: [400, 401, 403],
        context: ({ defaultContext, req }) => {
          return {
            ...defaultContext,
            tags: {
              locale: req.locale,
            },
          }
        },
        debug: true,
      },
      Sentry,
    }),
    stripePlugin({
      isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test') ?? false,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
      webhooks: {
        'checkout.session.completed': checkoutSessionCompleted,
      },
      logs: false,
    }),
    formBuilderPlugin({
      defaultToEmail: 'info@cvxjrgolf.org',
      fields: {
        array: ArrayBlock,
        dateOfBirth: DateOfBirth,
        payment: true,
      },
      beforeEmail: (emailsToSend, beforeChangeParams) => {
        const { data } = beforeChangeParams
        const formData = data.submissionData as Record<string, any[]>

        let additionalContent = '<hr style="margin: 30px 0; border: 1px solid #eee;">'
        additionalContent += '<h2 style="color: #333;">Registration Details</h2>'

        const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))

        arrayFields.forEach(([fieldName, items]) => {
          additionalContent += `<h3 style="margin-top: 20px; color: #333;">${fieldName.toUpperCase()}</h3>`

          items.forEach((item, index) => {
            additionalContent += `<div style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px;">`
            Object.entries(item).forEach(([key, value]) => {
              const formattedKey = key
                .split(/(?=[A-Z])|_|\s/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')

              let displayValue = value
              if (
                (key.toLowerCase().includes('date') || key.toLowerCase().includes('dob')) &&
                value &&
                typeof value === 'string'
              ) {
                try {
                  displayValue = format(new Date(value), 'MMMM d, yyyy')
                } catch (e) {
                  console.error('Invalid date:', value)
                }
              }
              additionalContent += `<p><strong>${formattedKey}:</strong> ${displayValue}</p>`
            })
            additionalContent += '</div>'
          })
        })

        emailsToSend.forEach((email) => {
          email.html = `${email.html || ''}${additionalContent}`
        })

        return emailsToSend
      },
      formOverrides: {
        access: {
          admin: authenticated,
          create: editorOrHigher,
          delete: editorOrHigher,
          update: editorOrHigher,
          read: authenticated,
        },
        hooks: {
          afterChange: [() => revalidatePath('/register')],
        },
        fields: ({ defaultFields }) => [
          ...defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ],
                }),
              }
            }
            return field
          }),
        ],
      },
      formSubmissionOverrides: {
        access: {
          admin: authenticated,
          update: adminOrSuperAdmin,
          delete: adminOrSuperAdmin,
          create: anyone,
          read: authenticated,
        },
        admin: {
          useAsTitle: 'title',
        },
        labels: {
          singular: 'Form Submission',
          plural: 'Form Submissions',
        },
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          const formField = defaultFields.find((field) => 'name' in field && field.name === 'form')

          const transformedFormField = formField
            ? {
                ...formField,
                admin: {
                  readOnly: false,
                },
                access: {
                  create: () => true,
                  update: () => adminOrSuperAdmin,
                },
              }
            : undefined

          return [
            ...(formField ? [transformedFormField] : []),
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'submissionData',
              type: 'json',
              admin: {
                components: {
                  Field: '@/plugins/form-builder/FormData',
                },
              },
            },
            {
              name: 'payment',
              type: 'group',
              admin: {
                position: 'sidebar',
              },
              fields: [
                {
                  name: 'amount',
                  type: 'number',
                },
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'pending',
                  options: [
                    { label: 'Pending', value: 'pending' },
                    { label: 'Paid', value: 'paid' },
                    { label: 'Cancelled', value: 'cancelled' },
                    { label: 'Refunded', value: 'refunded' },
                  ],
                },
              ],
            },
          ]
        },
        hooks: {
          afterChange: [createRegistrationsOnPayment],
        },
      },
    }),
    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        access: {
          admin: (args) => !superAdmin(args),
          read: superAdmin,
          delete: superAdmin,
          update: superAdmin,
          create: superAdmin,
        },
        admin: {
          group: 'Admin',
        },
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
      generateImage,
    }),
    s3StoragePlugin({
      ...S3_PLUGIN_CONFIG,
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => {
            if (typeof filename !== 'string') return null as unknown as string
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${prefix}/${filename}`
          },
          prefix: process.env.NEXT_PUBLIC_UPLOAD_PREFIX,
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
