import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'

import { stripePlugin } from '@payloadcms/plugin-stripe'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { fields, formBuilderPlugin } from '@payloadcms/plugin-form-builder'
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
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
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
import { Array, Price } from './blocks/Form/blocks'
import { checkoutSessionCompleted } from './plugins/stripe/webhooks/checkoutSessionCompleted'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  if ('name' in doc) {
    return doc.name ? `${doc.name} | CVX Junior Golf` : 'CVX Junior Golf'
  }
  return doc?.title ? `${doc.title} | CVX Junior Golf` : 'CVX Junior Golf'
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

export default buildConfig({
  admin: {
    avatar: 'default',
    components: {
      graphics: {
        Icon: '@/graphics/Icon',
        Logo: '@/components/Logo/Graphic',
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
        HeadingFeature({ enabledHeadingSizes: ['h2'] }),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        BlocksFeature({
          blocks: [MediaBlock],
        }),
        LinkFeature({
          enabledCollections: ['pages', 'media'],
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
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
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
  collections: [Pages, Events, Media, Users],
  cors: [baseUrl].filter(Boolean),
  csrf: [baseUrl].filter(Boolean),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL || '',
    defaultFromName: 'CVX Junior Golf',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  endpoints: [],
  globals: [Header, Footer, CompanyInfo],
  plugins: [
    stripePlugin({
      isTestKey: true || process.env.STRIPE_SECRET_KEY?.includes('sk_test'),
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
      webhooks: {
        'checkout.session.completed': checkoutSessionCompleted,
      },
      logs: true,
    }),
    formBuilderPlugin({
      defaultToEmail: 'info@cvxjrgolf.org',
      fields: {
        payment: false,
        array: Array,
        price: Price,
      },
      formOverrides: {
        labels: {
          singular: 'Registration Form',
          plural: 'Registration Forms',
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
        labels: {
          singular: 'Form Submission',
          plural: 'Form Submissions',
        },
        fields: ({ defaultFields }) => {
          const fields = defaultFields.map((field) => {
            if (field.type === 'array') {
              return {
                ...field,
                admin: {
                  ...field.admin,
                  initCollapsed: true,
                  components: {
                    RowLabel: '@/fields/form-submissions/FormSubmissionRowLabel',
                  },
                },
              }
            }
            return field
          })
          return [
            ...fields,
            {
              name: 'amount',
              type: 'number',
              admin: {
                position: 'sidebar',
              }
            },
            {
              name: 'paymentStatus',
              type: 'text',
              label: 'Payment Status',
              defaultValue: 'unpaid',
              admin: {
                position: 'sidebar',
              }
            }, {
              name: 'parents',
              type: 'array',
              admin: {
                components: {
                  RowLabel: '@/fields/form-submissions/PersonRowLabel',
                },
                condition: (_, siblingData) => {
                  return siblingData?.parents?.length > 0
                }
              },
              fields: [
                {
                  name: 'firstName',
                  label: 'First Name',
                  type: 'text',
                },
                {
                  name: 'lastName',
                  label: 'Last Name',
                  type: 'text',
                },
              ],
            },
            {
              name: 'players',
              type: 'array',
              admin: {
                components: {
                  RowLabel: '@/fields/form-submissions/PersonRowLabel',
                },
                condition: (_, siblingData) => {
                  return siblingData?.players?.length > 0
                }
              },
              fields: [
                {
                  name: 'firstName',
                  label: 'First Name',
                  type: 'text',
                },
                {
                  name: 'lastName',
                  label: 'Last Name',
                  type: 'text',
                },
                {
                  name: 'birthdate',
                  label: 'Birthdate',
                  type: 'text',
                },
                {
                  name: 'gender',
                  label: 'Gender',
                  type: 'text',
                },
                {
                  name: 'ethnicity',
                  label: 'Ethnicity',
                  type: 'text',
                }
              ],
            },

          ]
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
          generateFileURL: (args: any) => {
            if (typeof args.filename !== 'string') return null as unknown as string
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'media',
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
