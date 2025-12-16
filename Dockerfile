# syntax=docker/dockerfile:1

# 1) deps — установка зависимостей (кешируемо)
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
COPY scripts ./scripts
RUN npm ci

# 2) build — сборка Next
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 3) run — финальный рантайм (минимальный)
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# запуск не под root (безопаснее)
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# переносим standalone-сервер
COPY --from=build /app/.next/standalone ./
# переносим статику Next
COPY --from=build /app/.next/static ./.next/static
# переносим public
COPY --from=build /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]