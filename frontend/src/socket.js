import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BE_BASE_URL, {
	autoConnect: false,
	withCredentials: true,
});

export default socket;
