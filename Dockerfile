ARG nodejs=node:22-alpine

# === Build project and install dependencies =
FROM ${nodejs} AS builder

WORKDIR /app
ENV DATABASE_URL=file:../database.db

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn install 
RUN yarn prisma migrate dev
RUN yarn build
RUN yarn install --production=true
# === Build project and install dependencies =

# === Copy dist code and production dependencies ====
FROM ${nodejs} AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL=file:../database.db

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/database.db ./database.db
COPY --from=builder /app/LICENSE ./LICENSE
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
# === Copy dist code and production dependencies ====

EXPOSE 80

CMD ["node", "dist/main.js"]
