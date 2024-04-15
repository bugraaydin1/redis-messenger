import redisClient from "../redis.js";

const defaultLimiterConfig = {
	limit: 10,
	period: 60,
};

const rateLimiter = (
	limit = defaultLimiterConfig.limit,
	period = defaultLimiterConfig.period
) => {
	return async (req, res, next) => {
		const pathIpKey = `${req.path}@${req.socket.remoteAddress}`;

		const redisReply = await redisClient
			.multi()
			.incr(pathIpKey)
			.expire(pathIpKey, period)
			.exec();

		if (redisReply[0] > limit) {
			return res.status(429).json({
				loggedIn: false,
				status: `Too many requests, try again in ${period} seconds`,
			});
		}

		next();
	};
};

export default rateLimiter;
