FROM node:18-alpine
ENV NODE_ENV production
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
EXPOSE 5000

CMD npm start