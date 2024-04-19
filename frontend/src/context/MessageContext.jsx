import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
	const [messages, setMessages] = useState([
		{ id: 1, isSender: true, text: "Hello" },
		{ id: 2, isSender: false, text: "Hi. How are you?" },
	]);

	return (
		<MessageContext.Provider value={{ messages, setMessages }}>
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
