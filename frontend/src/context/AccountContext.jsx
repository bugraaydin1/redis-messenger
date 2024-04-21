import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
	const [user, setUser] = useState({ loggedIn: null });
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const response = await api.get("/auth/login");

				if (response.status === 200 && response.data.loggedIn) {
					setUser(response.data);
					navigate("/chat");
				}
			} catch (error) {
				navigate("/");
				setUser({ loggedIn: false, email: "", name: "" });
			}
		})();
	}, [navigate]);

	return (
		<AccountContext.Provider value={{ user, setUser }}>
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
