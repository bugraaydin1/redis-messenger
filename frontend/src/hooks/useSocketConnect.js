import { useEffect } from "react";
import socket from "../socket";
import { useAccountContext } from "../context/AccountContext";
import { useFriendContext } from "../context/FriendContext";

export default function useSocketConnect() {
	const { setUser } = useAccountContext();
	const { setFriendList } = useFriendContext();

	useEffect(() => {
		socket.connect();

		socket.on("friend_list", (friends) => {
			const list = friends.map((f) => ({
				...f,
				connected: f.connected === "true",
			}));
			setFriendList(list);
		});

		socket.on("connected", (status, friend) => {
			console.log({ status, friend });

			setFriendList((prev) =>
				prev.map((f) => {
					if (f.email === friend.email) {
						return { ...f, connected: status === "true" };
					}
					return f;
				})
			);
		});

		socket.on("connect_error", (err) => {
			console.warn(err);
			setUser({ loggedIn: false });
		});

		return () => {
			socket.off("connected");
			socket.off("connect_error");
			socket.off("friend_list");
		};
	}, [setUser, setFriendList]);
}
