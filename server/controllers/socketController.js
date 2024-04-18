import pool from "../db.js";
import redisClient from "../redis.js";

const connectController = async (socket) => {
	socket.join(socket.user.userId);

	await redisClient.hSet(`userid:${socket.user.email}`, {
		userid: socket.user.userId,
		connected: "true",
	});

	const friendList = await redisClient.lRange(
		`friends:${socket.user.email}`,
		0,
		-1
	);

	socket.emit(
		"friend_list",
		friendList.map((f) => JSON.parse(friendList))
	);

	// emit friends user as online
	emitFriendsConnected({
		socket,
		socketUser: socket.user,
		connectedStatus: "true",
	});
};

const addFriend = async (socket, email, cb) => {
	if (socket.user.email === email) {
		return cb({
			errorMsg: "Can't add yourself as a friend",
			success: false,
		});
	}

	// get email owner from Hash ~ {}
	const friend = await redisClient.hGetAll(`userid:${email}`);

	if (!friend.userid) {
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
	if (friend.userid) {
		const friendUserQuery = await pool.query(
			`SELECT name FROM users WHERE email=$1`,
			[email]
		);

		const newFriend = {
			email,
			userId: friend.userid,
			name: friendUserQuery.rows[0].name,
			connected: friend.connected,
		};

		await redisClient.lPush(
			`friends:${socket.user.email}`,
			JSON.stringify(newFriend)
		);
		return cb({ success: true, friend: newFriend });
	}
};

const disconnectUser = async (socket) => {
	await redisClient.hSet(`userid:${socket.user.email}`, { connected: "false" });

	emitFriendsConnected({
		socket,
		socketUser: socket.user,
		connectedStatus: "false",
	});
};

const emitFriendsConnected = async ({
	socket,
	socketUser,
	connectedStatus,
}) => {
	const friendList = await redisClient.lRange(
		`friends:${socketUser.email}`,
		0,
		-1
	);
	const friendRooms = friendList.map((f) => JSON.parse(f).userId);

	console.log({ friendRooms, connectedStatus });

	if (friendRooms.length > 0) {
		socket.to(friendRooms).emit("connected", connectedStatus, socketUser);
	}
};

export { addFriend, connectController, disconnectUser };
