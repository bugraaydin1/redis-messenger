import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
	baseURL: "/api",
	timeout: 5000,
	withCredentials: true,
	headers: {
		Authorization: token ? `Bearer ${token}` : "",
	},
});

export default api;
