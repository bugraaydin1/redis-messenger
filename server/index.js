import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";

const app = express();
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("welcome!");
});

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
