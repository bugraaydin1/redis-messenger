import axios from "axios";

const token = localStorage.getItem("token");

const baseURL = `${import.meta.env.VITE_BE_BASE_URL}/api`;

const api = axios.create({
	baseURL,
	timeout: 5000,
	withCredentials: true,
	headers: {
		Authorization: token ? `Bearer ${token}` : "",
	},
});

export default api;
