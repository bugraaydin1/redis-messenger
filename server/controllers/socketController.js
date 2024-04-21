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

	if (friendList.length > 0) {
		socket.emit(
			"friend_list",
			friendList.map((f) => JSON.parse(f))
		);
	}

	// emit friends user as online
	emitConnectedToFriends({
		socket,
		socketUser: socket.user,
		connectedStatus: "true",
	});

	const messages = await redisClient.lRange(
		`chats:${socket.user.userId}`,
		0,
		-1
	);

	if (messages.length > 0) {
		socket.emit(
			"message_list",
			messages.map((m) => JSON.parse(m))
		);
	}
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

const messageController = async (socket, message) => {
	message.from ??= socket.user.userId;

	await redisClient.lPush(`chats:${message.to}`, JSON.stringify(message));
	await redisClient.lPush(`chats:${message.from}`, JSON.stringify(message));

	socket.to(message.to).emit("dm", message);
};

const typingController = (socket, typing) => {
	const { to: userId, status } = typing;
	socket.to(userId).emit("typing", {
		[socket.user.userId]: status,
	});
};

const disconnectUser = async (socket) => {
	await redisClient.hSet(`userid:${socket.user.email}`, { connected: "false" });

	emitConnectedToFriends({
		socket,
		socketUser: socket.user,
		connectedStatus: "false",
	});
};

const emitConnectedToFriends = async ({
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

	if (friendRooms.length > 0) {
		socket.to(friendRooms).emit("connected", connectedStatus, socketUser);
	}
};

export {
	addFriend,
	connectController,
	messageController,
	typingController,
	disconnectUser,
};
