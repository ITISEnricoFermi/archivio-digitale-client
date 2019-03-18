FROM node:10.15.1-jessie-slim as builder

WORKDIR /app
COPY package.json package.json
RUN yarn

COPY . .
RUN yarn build

FROM nginx:latest
COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT=80
EXPOSE 80

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
