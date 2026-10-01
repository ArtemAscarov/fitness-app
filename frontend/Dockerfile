FROM node:22-slim as build
WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build 

FROM node:22-slim as runtime
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build ./app/.next ./.next
USER node
EXPOSE 3000
CMD npm run start