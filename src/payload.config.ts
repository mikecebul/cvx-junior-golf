import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'

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
import { checkoutSessionCompleted } from './plugins/Stripe/WebHooks/checkoutSessionCompleted'
import { Media } from './collections/Media'
import { MediaBlock } from './blocks/MediaBlock/config'
import { anyone } from './access/anyone'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  if ('name' in doc) {
    return doc.name ? `${doc.name} | CVX Junior Golf` : 'CVX Junior Golf'
  }
  return doc?.title ? `${doc.title} | CVX Junior Golf` : 'CVX Junior Golf'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  if (!doc.slug) return process.env.NEXT_PUBLIC_SERVER_URL!
  return `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
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
        Logo: '@/graphics/Logo',
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
  db: sqliteAdapter({
    client: {
      url: process.env.LOCAL_DATABASE_URL ?? process.env.TURSO_DATABASE_URL!,
      authToken: process.env.LOCAL_DATABASE_URL ? undefined : process.env.TURSO_AUTH_TOKEN,
    },
    push: Boolean(process.env.LOCAL_DATABASE_URL),
    logger: false,
  }),
  collections: [Pages, Events, Media, Users],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL || '',
    defaultFromName: 'BASES Admin',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  endpoints: [],
  globals: [Header, Footer, CompanyInfo],
  plugins: [
    stripePlugin({
      // isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test'),
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
      webhooks: {
        'checkout.session.completed': checkoutSessionCompleted,
      },
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => [
          {
            name: 'requirePayment',
            type: 'checkbox',
            label: 'Require Payment',
            defaultValue: false,
          },
          {
            name: 'event',
            type: 'relationship',
            relationTo: 'events',
            admin: {
              condition: (data, siblingData) => {
                if (siblingData && 'requirePayment' in siblingData) {
                  return siblingData.requirePayment === true
                }
                return false
              },
            },
          },
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
          {
            name: 'submissions',
            type: 'join',
            collection: 'form-submissions',
            on: 'form',
          },
        ],
      },
      formSubmissionOverrides: {
        access: {
          update: anyone,
        },
        fields: ({ defaultFields }) => {
          return defaultFields
            .map((field) => {
              if (field.type === 'array') {
                return {
                  ...field,
                  admin: {
                    ...field.admin,
                    components: {
                      RowLabel: '@/fields/form-submissions/FormSubmissionRowLabel',
                    },
                  },
                }
              }
              return field
            })
            .concat([
              {
                name: 'status',
                label: 'Payment Status',
                type: 'text',
                defaultValue: 'pending',
                admin: {
                  position: 'sidebar',
                },
              },
              {
                name: 'amount',
                label: 'Amount Paid',
                type: 'text',
                admin: {
                  position: 'sidebar',
                },
              },
            ])
        },
      },
    }),
    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        access: {
          admin: superAdmin,
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
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'v2',
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
