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
			setFriendList(friends);
		});

		socket.on("connect_error", (err) => {
			console.warn(err);
			setUser({ loggedIn: false });
		});

		return () => {
			socket.off("connect_error");
			socket.off("friend_list");
		};
	}, [setUser]);
}
