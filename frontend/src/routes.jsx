import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/register",
		element: <div>Signup</div>,
	},
	{
		path: "*",
		element: <Login />,
	},
]);
