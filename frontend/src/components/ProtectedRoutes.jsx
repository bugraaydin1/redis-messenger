import { Outlet, Navigate } from "react-router-dom";
import { useAccountContext } from "../context/AccountContext";

const useAuth = () => {
	const { user } = useAccountContext();
	return user?.loggedIn;
};

export default function ProtectedRoutes() {
	const isLoggedIn = useAuth();

	return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
