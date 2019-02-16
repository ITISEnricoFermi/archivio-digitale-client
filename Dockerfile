ARG API_HOSTNAME=localhost

FROM node:10.15.1-jessie-slim as builder
WORKDIR /tmp
ENV API_URL=${API_HOSTNAME}

COPY . .
RUN npm install && npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html
COPY --from=builder /tmp/dist .
