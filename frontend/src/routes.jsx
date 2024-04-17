import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layout";
import ProtectedRoutes from "./components/ProtectedRoutes";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				lazy: async () => ({
					Component: (await import("./components/Auth/Login")).default,
				}),
			},
			{
				path: "register",
				lazy: async () => ({
					Component: (await import("./components/Auth/Signup")).default,
				}),
			},
			{
				element: <ProtectedRoutes />,
				children: [
					{
						path: "chat",
						lazy: async () => ({
							Component: (await import("./components/Chat")).default,
						}),
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);
