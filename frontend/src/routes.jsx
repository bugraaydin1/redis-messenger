import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Signup />,
	},
	{
		path: "*",
		element: <Login />,
	},
]);
