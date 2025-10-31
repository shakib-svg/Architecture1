# ---------- Étape 1 : build ----------
FROM node:18 AS builder
WORKDIR /app
# 1) Installer TOUTES les deps (dev incluses) pour compiler
COPY package.json package-lock.json ./
RUN npm install
# 2) Copier le code et compiler TypeScript -> dist/
COPY . .
RUN npm run build
# ---------- Étape 2 : runtime ----------
FROM node:18-slim AS runner
WORKDIR /app
# 3) Installer UNIQUEMENT les deps de prod
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --omit=dev   # <= pas de npm ci
# 4) Copier le code compilé
COPY --from=builder /app/dist ./dist
EXPOSE 8000
CMD ["node", "dist/index.js"]
