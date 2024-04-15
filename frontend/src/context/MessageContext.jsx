import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
	const [chats, setChats] = useState([
		{
			id: 1,
			name: "Buğra",
			isOnline: true,
			messages: [
				{
					id: 1,
					text: "Message1",
					isSender: true,
				},
				{
					id: 2,
					text: "Message2",
					isSender: false,
				},
			],
		},
		{
			id: 2,
			name: "Ahmet",
			isOnline: false,
			messages: [
				{
					id: 3,
					text: "Chat2 Message1",
					isSender: true,
				},
				{
					id: 4,
					text: "Chat2 Message2",
					isSender: false,
				},
			],
		},
	]);

	return (
		<MessageContext.Provider value={{ chats, setChats }}>
			{children}
		</MessageContext.Provider>
	);
};

const useMessageContext = () => {
	const context = useContext(MessageContext);

	if (context === null) {
		throw new Error("useMessageState must be used within a MessageProvider");
	}
	return context;
};

export { MessageProvider, useMessageContext };
