import { createContext, useContext, useState } from "react";

const initialValues = {
	user: {
		loggedIn: false,
		email: "",
	},
};

const AccountContext = createContext(initialValues);

const AccountProvider = ({ children }) => {
	const [user, setUser] = useState();

	return (
		<AccountContext.Provider value={{ user, setUser }}>
			{children}
		</AccountContext.Provider>
	);
};

const useAccountContext = () => {
	const context = useContext(AccountContext);
	if (context === null) {
		throw new Error("useAccountState must be used within a AccountProvider");
	}
	return context;
};

export { AccountProvider, useAccountContext };
