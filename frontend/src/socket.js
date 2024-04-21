import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_BE_BASE_URL, {
	auth: { token },
	autoConnect: false,
	withCredentials: true,
});

export default socket;
