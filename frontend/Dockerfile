FROM node:18-alpine AS builder
ENV NODE_ENV production
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --dev

COPY . .
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.24-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
