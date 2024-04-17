import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { Server } from "socket.io";

import sessionMiddleware from "./middlewares/session.js";
import socketAuthMiddleware from "./middlewares/socketAuth.js";

import authRouter from "./routers/authRouter.js";

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
app.use(sessionMiddleware);

app.get("/", (req, res) => {
	res.send("welcome!");
});

app.use("/api/auth", authRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: corsConfig });
io.engine.use(sessionMiddleware);
io.use(socketAuthMiddleware);

io.on("connect", (socket) => {
	console.log("socket id:", socket.id);
	console.log("socket session:", socket.request.session.user);
});

server.listen(5000, () => {
	console.log("Server started on http://localhost:5000");
});
