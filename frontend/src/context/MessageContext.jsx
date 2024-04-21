import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);

	return (
		<MessageContext.Provider value={{ messages, setMessages }}>
			{children}
		</MessageContext.Provider>
	);
};

const useMessageContext = () => {
	const context = useContext(MessageContext);

	if (context === undefined) {
		throw new Error("useMessageState must be used within a MessageProvider");
	}
	return context;
};

export { MessageProvider, useMessageContext };
