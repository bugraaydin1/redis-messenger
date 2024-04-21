import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { Server } from "socket.io";
import redisClient from "./redis.js";

import authRouter from "./routers/authRouter.js";
import {
	addFriend,
	connectController,
	disconnectUser,
	messageController,
	typingController,
} from "./controllers/socketController.js";

import socketAuthMiddleware from "./middlewares/socketAuth.js";

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

const corsConfig = {
	origin: "http://localhost:3000",
	credentials: true,
};

const app = express();
app.use(helmet());
app.use(cors(corsConfig));

app.use(express.json());

app.get("/", (req, res) => {
	res.send("welcome!");
});

app.use("/api/auth", authRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: corsConfig });
io.use(socketAuthMiddleware);

io.on("connect", (socket) => {
	io.use(socketAuthMiddleware);
	connectController(socket);

	socket.on("dm", (message) => {
		messageController(socket, message);
	});

	socket.on("typing", (typing) => {
		typingController(socket, typing);
	});

	socket.on("add_friend", (email, cb) => {
		addFriend(socket, email, cb);
	});

	socket.on("disconnecting", () => {
		disconnectUser(socket);
	});
});

server.listen(5000, () => {
	console.log("Server started on http://localhost:5000");
});
