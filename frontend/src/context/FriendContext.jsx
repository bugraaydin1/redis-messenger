import { createContext, useContext, useState } from "react";

const FriendContext = createContext();

const FriendProvider = ({ children }) => {
	const [friendList, setFriendList] = useState([]);

	return (
		<FriendContext.Provider value={{ friendList, setFriendList }}>
			{children}
		</FriendContext.Provider>
	);
};

const useFriendContext = () => {
	const context = useContext(FriendContext);

	if (context === null) {
		throw new Error("useFriendContext must be used within a FriendProvider");
	}
	return context;
};

export { FriendProvider, useFriendContext };
