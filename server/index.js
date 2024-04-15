import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import session from "express-session";
import RedisStore from "connect-redis";
import { Server } from "socket.io";

import redisClient from "./redis.js";
import authRouter from "./routers/authRouter.js";

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

const app = express();
app.use(helmet());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json());
app.use(
	session({
		name: "sid",
		resave: false,
		saveUninitialized: false,
		store: new RedisStore({
			client: redisClient,
			prefix: "messenger:",
		}),
		secret: process.env.SESSION_SECRET,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 3600 * 24,
			secure: process.env.ENVIRONMENT === "production" ? true : "auto",
			sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
		},
	})
);

app.get("/", (req, res) => {
	res.send("welcome!");
});

app.use("/api/auth", authRouter);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "https://localhost:3000",
		credentials: true,
	},
});

io.on("connection", (client) => {
	console.log({ client });
});

server.listen(5000, () => {
	console.log("Server started on http://localhost:5000");
});
