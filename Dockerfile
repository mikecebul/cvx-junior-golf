FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Add these lines to include all environment variables
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_IS_LIVE
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG RESEND_DEFAULT_EMAIL
ARG RESEND_API_KEY
ARG DATABASE_URI
ARG S3_ENABLED
ARG S3_ACCESS_KEY_ID
ARG S3_SECRET_ACCESS_KEY
ARG S3_REGION
ARG S3_ENDPOINT
ARG S3_BUCKET
ARG NEXT_PUBLIC_S3_HOSTNAME
ARG NEXT_PUBLIC_UPLOAD_PREFIX
ARG UNSPLASH_ACCESS_KEY
ARG UNSPLASH_SECRET_KEY
ARG UNSPLASH_URL
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG SOURCE_API_URL
ARG SOURCE_API_KEY

ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_IS_LIVE=${NEXT_PUBLIC_IS_LIVE}
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
ENV RESEND_DEFAULT_EMAIL=${RESEND_DEFAULT_EMAIL}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV DATABASE_URI=${DATABASE_URI}
ENV S3_ENABLED=${S3_ENABLED}
ENV S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID}
ENV S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY}
ENV S3_REGION=${S3_REGION}
ENV S3_ENDPOINT=${S3_ENDPOINT}
ENV S3_BUCKET=${S3_BUCKET}
ENV NEXT_PUBLIC_S3_HOSTNAME=${NEXT_PUBLIC_S3_HOSTNAME}
ENV NEXT_PUBLIC_UPLOAD_PREFIX=${NEXT_PUBLIC_UPLOAD_PREFIX}
ENV UNSPLASH_ACCESS_KEY=${UNSPLASH_ACCESS_KEY}
ENV UNSPLASH_SECRET_KEY=${UNSPLASH_SECRET_KEY}
ENV UNSPLASH_URL=${UNSPLASH_URL}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
ENV SOURCE_API_URL=${SOURCE_API_URL}
ENV SOURCE_API_KEY=${SOURCE_API_KEY}

ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
