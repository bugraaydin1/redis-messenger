import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	console.log("vite mode=", mode);
	console.log("env=", env);

	return {
		plugins: [react()],
		server: {
			port: 3000,
			proxy: {
				"/api": {
					target: env.VITE_BE_BASE_URL,
				},
				"/socket.io": {
					target: env.VITE_SOCKET_URL,
					ws: true,
				},
			},
		},
	};
});
