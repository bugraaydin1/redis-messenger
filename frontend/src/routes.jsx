import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Chat from "./components/Chat";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
		element: <Login />,
	},
]);
