import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layout";
import ProtectedRoutes from "./components/ProtectedRoutes";

const Login = lazy(() => import("./components/Auth/Login"));
const Signup = lazy(() => import("./components/Auth/Signup"));
const Chat = lazy(() => import("./components/Chat"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: "register",
				element: <Signup />,
			},
			{
				element: <ProtectedRoutes />,
				children: [
					{
						path: "chat",
						element: <Chat />,
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
