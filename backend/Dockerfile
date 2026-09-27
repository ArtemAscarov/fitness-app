FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate
RUN npm run build 

FROM node:22-slim AS runtime
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm ci --omit=dev
COPY prisma ./prisma
RUN npx prisma generate
COPY --from=build app/dist ./dist
USER node
EXPOSE 3001
CMD ["node", "dist/src/server.js"] 
