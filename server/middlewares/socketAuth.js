import jwt from "jsonwebtoken";
import redisClient from "../redis.js";

const socketAuthMiddleware = (socket, next) => {
	const token = socket.handshake.auth.token;

	if (!token) {
		return next(new Error("Socket don't have token"));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		socket.user = decoded;
	} catch (err) {
		return next(new Error("Socket not authorized"));
	}

	next();
};

export default socketAuthMiddleware;
