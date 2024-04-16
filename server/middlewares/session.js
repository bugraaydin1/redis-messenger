import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "../redis.js";

const sessionMiddleware = session({
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
		secure: process.env.NODE_ENV === "production" ? true : "auto",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	},
});

export default sessionMiddleware;
