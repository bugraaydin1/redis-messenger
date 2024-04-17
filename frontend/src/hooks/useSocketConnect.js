import { useEffect } from "react";
import socket from "../socket";
import { useAccountContext } from "../context/AccountContext";

export default function useSocketConnect() {
	const { setUser } = useAccountContext();

	useEffect(() => {
		socket.connect();
		socket.on("connect_error", (err) => {
			console.warn(err);
			setUser({ loggedIn: false });
		});

		return () => {
			socket.off("connect_error");
		};
	}, [setUser]);
}
