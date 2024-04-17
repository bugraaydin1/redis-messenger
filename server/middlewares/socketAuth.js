const socketAuthMiddleware = (socket, next) => {
	if (!socket.request.session?.user) {
		console.log("bad request:", socket.request.session);
		return next(new Error("Socket not authorized"));
	}

	next();
};

export default socketAuthMiddleware;
