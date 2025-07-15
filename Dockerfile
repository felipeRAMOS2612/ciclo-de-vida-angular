
FROM node:20-alpine AS builder

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm run build

FROM node:20-alpine AS production

RUN apk add --no-cache curl dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S angular -u 1001

WORKDIR /app

COPY --from=builder --chown=angular:nodejs /app/dist ./dist
COPY --from=builder --chown=angular:nodejs /app/package*.json ./
COPY --from=builder --chown=angular:nodejs /app/node_modules ./node_modules

USER angular

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "serve:ssr"]