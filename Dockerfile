
FROM node:10.15.1-jessie-slim as builder

ARG API=backend
ENV VUE_APP_REMOTE=${API}
ENV VUE_APP_LOCAL=${API}

WORKDIR /tmp
COPY package.json package.json
RUN yarn

ENV NODE_ENV=production
COPY . .
RUN node print.js && yarn build

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/nginx/html
COPY --from=builder /tmp/dist .
CMD ["nginx", "-g", "daemon off;"]
