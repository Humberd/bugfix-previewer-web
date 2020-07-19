FROM node:13-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:web-app

FROM arm32v7/nginx:1.17.9
COPY --from=builder /app/dist/bugfix-previewer-web/ /usr/share/nginx/html
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

