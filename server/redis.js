import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

const redisClient = await createClient({ url: process.env.REDIS_URL })
	.on("error", (err) => console.log("Redis client error:", err))
	.connect();

export default redisClient;
