FROM node:22-slim AS build
WORKDIR /app
COPY . ./
RUN npm ci
ARG NEXT_PUBLIC_BACKEND_URL 
RUN npm run build 

FROM node:22-slim AS runtime
WORKDIR /app
ENV HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node ./app/.next/standalone ./
COPY --from=build --chown=node:node ./app/.next/static ./.next/static
COPY --from=build --chown=node:node ./app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]