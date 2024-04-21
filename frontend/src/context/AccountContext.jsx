import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
	const [user, setUser] = useState({
		loggedIn: null,
		name: localStorage.getItem("name"),
		token: localStorage.getItem("token"),
	});

	const navigate = useNavigate();

	const logoutUser = () => {
		navigate("/");
		setUser({ loggedIn: false });
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		api.defaults.headers.common.Authorization = "";
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await api.get("/auth/login");

				if (response.status === 200 && response.data.loggedIn) {
					setUser((u) => ({ ...u, ...response.data }));
					navigate("/chat");
				} else {
					logoutUser();
				}
			} catch (error) {
				logoutUser();
			}
		})();
	}, [navigate]);

	return (
		<AccountContext.Provider value={{ user, setUser, logoutUser }}>
			{children}
		</AccountContext.Provider>
	);
};

const useAccountContext = () => {
	const context = useContext(AccountContext);

	if (context === undefined) {
		throw new Error("useAccountState must be used within a AccountProvider");
	}
	return context;
};

export { AccountProvider, useAccountContext };
