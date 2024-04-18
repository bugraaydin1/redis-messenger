import redisClient from "../redis.js";

const socketAuthMiddleware = (socket, next) => {
	if (!socket.request.session?.user) {
		return next(new Error("Socket not authorized"));
	}

	socket.user = socket.request.session.user;
	next();
};

export default socketAuthMiddleware;
