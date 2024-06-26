import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd()); // add last arg "" not to filter out vars
	console.log("vite mode:", mode);

	return {
		plugins: [react()],
		server: {
			host: true,
			port: 3000,
			strictPort: true,
			hmr: {
				clientPort: 3000,
			},
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
