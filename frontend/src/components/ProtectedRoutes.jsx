import { Outlet, Navigate } from "react-router-dom";
import { useAccountContext } from "../context/AccountContext";

export default function ProtectedRoutes() {
	const { user } = useAccountContext();

	return user?.loggedIn ? <Outlet /> : <Navigate to="/" />;
}
