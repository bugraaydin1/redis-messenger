# Redis Messenger
![redis-messenger-screenshot](https://github.com/bugraaydin1/redis-messenger/assets/15525179/ab1e5cde-4702-4e02-9229-76bf4cf622af)

## Description

A real time chat app where users can add friends and communicate with them.

## Project Structure

- frontend - React.js Frontend
- server - Node.js Backend

## How it works

- Front-End: React.js
- Back-End: Node.js / Express.js / Socket.io
- Authenticaion: JWT
- Database: PostgreSQL and Redis

## Running the Project

- Clone the repository
- CD into the repository and run `npm install`
- Have a Redis instance listening to `localhost:6379` OR define an env variable named `REDIS_URL`
- Have a PostreSQL db running and provide either `DATABASE_URL` as an environment variable, or provide the following:
  <br/>`PGDATABASE`
  <br/>`PGHOST`
  <br/>`PGUSER`
  <br/>`PGPASSWORD`
  <br/>`PGPORT`
  <br/>`JWT_SECRET`
- Note: all environment variables must be defined in files named `.env.development` and `.env.production`
- Run `npm run dev:server` and `npm run dev:frontend`
