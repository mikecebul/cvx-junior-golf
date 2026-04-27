# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 website for Charlevoix Junior Golf League with Payload CMS 3.x for content management. Uses block-based page architecture with Stripe payments, form management, and S3/Cloudflare R2 media storage.

## Commands

```bash
pnpm install              # Install dependencies (pnpm only, not npm/yarn)
pnpm run dev              # Start dev server with Turbopack
pnpm run build            # Build for production (runs migrations first)
pnpm run lint             # Run ESLint
pnpm run lint:fix         # Fix linting issues
pnpm run generate:types   # Regenerate TypeScript types from Payload schema
pnpm run generate:importmap  # Regenerate admin UI import map
pnpm run migrate:create   # Create new database migration
pnpm run payload <cmd>    # Run Payload CLI commands
```

Stripe webhook forwarding for local dev:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

## Architecture

### Block-Based Pages
Pages are built with reusable blocks defined in `/src/blocks/`. Each block has:
- `config.ts` - Payload CMS field schema
- `Component.tsx` - React component

Blocks are rendered via `RenderBlocks.tsx`. Available blocks: RichText, Form, EventsBlock, EventCards, FeatureCards, Links, MediaBlock, Layout, NewTwoColumnLayout, EventsPage.

### Collections & Globals
- **Collections** (`/src/collections/`): Pages, Events, Forms, FormSubmissions, RegistrationsV2, Media, Users
- **Globals** (`/src/globals/`): Header, Footer, CompanyInfo

### Access Control
Role-based with four levels: Super Admin > Admin > Editor > User. Access functions in `/src/access/`:
- `superAdmin()`, `adminOrSuperAdmin()`, `editorOrHigher()`, `authenticated()`, `authenticatedOrPublished()`, `anyone()`

### Key Utilities (`/src/utilities/`)
- `getPayload()` from `payload` with `configPromise` from `@payload-config` for server-side data fetching
- `getGlobals()` for fetching header/footer/company info
- `cn()` for className merging (clsx + tailwind-merge)
- `generateMeta()` for SEO metadata

### Data Fetching Patterns
Server components use `cache()` wrapper with Payload queries:
```typescript
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const payload = await getPayload({ config: configPromise })
const result = await payload.find({ collection: 'pages', where: { ... } })
```

### Forms
- **Dynamic forms**: TanStack Form + Zod validation in `/src/blocks/Form/`
- **Static forms**: Pre-built forms in `/src/blocks/TanstackForm/`

### Rich Text
Lexical editor configured in `/src/fields/default-lexical/`, rendered via `/src/components/RichText/`.

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, Turbopack)
- **CMS**: Payload CMS 3.x with MongoDB
- **Styling**: Tailwind CSS 4.x + shadcn/ui (Radix primitives)
- **Forms**: TanStack Form + Zod
- **Payments**: Stripe
- **Media**: S3-compatible storage (Cloudflare R2)
- **Monitoring**: Sentry

## Path Aliases

- `@/*` → `./src/*`
- `@payload-config` → `./src/payload.config.ts`

## Creating New Blocks

1. Create folder: `src/blocks/MyBlock/`
2. Add `config.ts` with Payload Block schema
3. Add `Component.tsx` with React component
4. Register in `RenderBlocks.tsx` blockComponents object
5. Add block to Pages collection layout field

## Environment Variables

See `.env.example` for required variables. Key ones:
- `DATABASE_URI` - MongoDB connection
- `PAYLOAD_SECRET` - JWT secret
- `NEXT_PUBLIC_SERVER_URL` - Base URL
- `S3_*` variables for media storage
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOKS_ENDPOINT_SECRET` for payments
