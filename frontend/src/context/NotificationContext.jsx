import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const [typingFriends, setTypingFriends] = useState({});

	return (
		<NotificationContext.Provider
			value={{
				typingFriends,
				setTypingFriends,
				notifications,
				setNotifications,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

const useNotificationContext = () => {
	const context = useContext(NotificationContext);

	if (context === undefined) {
		throw new Error(
			"useNotificationContext must be used within a NotificationProvider"
		);
	}
	return context;
};

export { NotificationProvider, useNotificationContext };
