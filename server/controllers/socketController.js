import pool from "../db.js";
import redisClient from "../redis.js";

const connectController = async (socket) => {
	await redisClient.hSet(
		`userid:${socket.user.email}`,
		"userid",
		socket.user.userId
	);

	const friendList = await redisClient.lRange(
		`friends:${socket.user.email}`,
		0,
		-1
	);

	socket.emit(
		"friend_list",
		friendList.map((f) => JSON.parse(friendList))
	);
};

const addFriend = async (socket, email, cb) => {
	if (socket.user.email === email) {
		return cb({
			errorMsg: "Can't add yourself as a friend",
			success: false,
		});
	}

	// get userid of that email from Hash ~ {}
	const friendId = await redisClient.hGet(`userid:${email}`, "userid");

	if (!friendId) {
		return cb({
			errorMsg: "No user with this email",
			success: false,
		});
	}

	// get all friends as Set ~ []
	const currentFriendList = await redisClient.lRange(
		`friends:${socket.user.email}`,
		0,
		-1
	);
	console.log({ currentFriendList });

	const friendAlreadyAdded = currentFriendList?.some(
		(friendInfo) => JSON.parse(friendInfo).email === email
	);

	if (friendAlreadyAdded) {
		return cb({
			errorMsg: "Friend already added",
			success: false,
		});
	}

	// adding a new friend
	if (friendId) {
		const friendUserQuery = await pool.query(
			`SELECT name from users WHERE email=$1`,
			[email]
		);

		const newFriend = JSON.stringify({
			email,
			name: friendUserQuery.rows[0].name,
		});

		await redisClient.lPush(`friends:${socket.user.email}`, newFriend);
		return cb({ success: true });
	}
};

export { addFriend, connectController };
