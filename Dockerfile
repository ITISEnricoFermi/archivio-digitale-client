
FROM node:10.15.1-jessie-slim as builder

WORKDIR /tmp
COPY package.json package.json
RUN yarn

COPY . .
RUN yarn build

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/nginx/html
COPY --from=builder /tmp/dist .
CMD ["nginx", "-g", "daemon off;"]
