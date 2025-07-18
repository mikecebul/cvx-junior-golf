FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Update and enable Corepack
RUN npm install -g corepack@latest

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# install require in the middle package
# RUN pnpm add require-in-the-middle@"$(jq -r '.dependencies["require-in-the-middle"]' < package.json)"


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create .env.production from Docker secrets
RUN --mount=type=secret,id=DATABASE_URI \
  --mount=type=secret,id=DOCKERHUB_TOKEN \
  --mount=type=secret,id=DOCKERHUB_USERNAME \
  --mount=type=secret,id=NEXT_PUBLIC_GOOGLE_MAPS_API_KEY \
  --mount=type=secret,id=NEXT_PUBLIC_IS_LIVE \
  --mount=type=secret,id=NEXT_PUBLIC_S3_HOSTNAME \
  --mount=type=secret,id=NEXT_PUBLIC_SENTRY_DSN \
  --mount=type=secret,id=NEXT_PUBLIC_SERVER_URL \
  --mount=type=secret,id=NEXT_PUBLIC_UPLOAD_PREFIX \
  --mount=type=secret,id=PAYLOAD_SECRET \
  --mount=type=secret,id=EMAIL_HOST \
  --mount=type=secret,id=EMAIL_PORT \
  --mount=type=secret,id=EMAIL_USER \
  --mount=type=secret,id=EMAIL_PASSWORD \
  --mount=type=secret,id=S3_ACCESS_KEY_ID \
  --mount=type=secret,id=S3_BUCKET \
  --mount=type=secret,id=S3_ENDPOINT \
  --mount=type=secret,id=S3_REGION \
  --mount=type=secret,id=S3_SECRET_ACCESS_KEY \
  --mount=type=secret,id=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=SOURCE_API_KEY \
  --mount=type=secret,id=SOURCE_API_URL \
  --mount=type=secret,id=STRIPE_SECRET_KEY \
  --mount=type=secret,id=STRIPE_WEBHOOKS_ENDPOINT_SECRET \
  --mount=type=secret,id=UNSPLASH_ACCESS_KEY \
  --mount=type=secret,id=UNSPLASH_URL \
  sh -c '( \
  echo "DATABASE_URI=$(cat /run/secrets/DATABASE_URI)" && \
  echo "DOCKERHUB_TOKEN=$(cat /run/secrets/DOCKERHUB_TOKEN)" && \
  echo "DOCKERHUB_USERNAME=$(cat /run/secrets/DOCKERHUB_USERNAME)" && \
  echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$(cat /run/secrets/NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)" && \
  echo "NEXT_PUBLIC_IS_LIVE=$(cat /run/secrets/NEXT_PUBLIC_IS_LIVE)" && \
  echo "NEXT_PUBLIC_S3_HOSTNAME=$(cat /run/secrets/NEXT_PUBLIC_S3_HOSTNAME)" && \
  echo "NEXT_PUBLIC_SENTRY_DSN=$(cat /run/secrets/NEXT_PUBLIC_SENTRY_DSN)" && \
  echo "NEXT_PUBLIC_SERVER_URL=$(cat /run/secrets/NEXT_PUBLIC_SERVER_URL)" && \
  echo "NEXT_PUBLIC_UPLOAD_PREFIX=$(cat /run/secrets/NEXT_PUBLIC_UPLOAD_PREFIX)" && \
  echo "PAYLOAD_SECRET=$(cat /run/secrets/PAYLOAD_SECRET)" && \
  echo "EMAIL_HOST=$(cat /run/secrets/EMAIL_HOST)" && \
  echo "EMAIL_PORT=$(cat /run/secrets/EMAIL_PORT)" && \
  echo "EMAIL_USER=$(cat /run/secrets/EMAIL_USER)" && \
  echo "EMAIL_PASSWORD=$(cat /run/secrets/EMAIL_PASSWORD)" && \
  echo "S3_ACCESS_KEY_ID=$(cat /run/secrets/S3_ACCESS_KEY_ID)" && \
  echo "S3_BUCKET=$(cat /run/secrets/S3_BUCKET)" && \
  echo "S3_ENDPOINT=$(cat /run/secrets/S3_ENDPOINT)" && \
  echo "S3_REGION=$(cat /run/secrets/S3_REGION)" && \
  echo "S3_SECRET_ACCESS_KEY=$(cat /run/secrets/S3_SECRET_ACCESS_KEY)" && \
  echo "SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN)" && \
  echo "SOURCE_API_KEY=$(cat /run/secrets/SOURCE_API_KEY)" && \
  echo "SOURCE_API_URL=$(cat /run/secrets/SOURCE_API_URL)" && \
  echo "STRIPE_SECRET_KEY=$(cat /run/secrets/STRIPE_SECRET_KEY)" && \
  echo "STRIPE_WEBHOOKS_ENDPOINT_SECRET=$(cat /run/secrets/STRIPE_WEBHOOKS_ENDPOINT_SECRET)" && \
  echo "UNSPLASH_ACCESS_KEY=$(cat /run/secrets/UNSPLASH_ACCESS_KEY)" && \
  echo "UNSPLASH_URL=$(cat /run/secrets/UNSPLASH_URL)" \
  ) > .env.production'

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_OUTPUT=standalone

# Update and enable Corepack
RUN npm install -g corepack@latest

RUN \
  if [ -f pnpm-lock.yaml ]; then \
  corepack enable pnpm && \
  set -a && . ./.env.production && set +a && \
  pnpm run build; \
  else \
  echo "Lockfile not found." && exit 1; \
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
