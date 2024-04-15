import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useMessageContext } from "../../context/MessageContext";
import MessageBox from "./MessageBox";

export default function Messages() {
	const { chats } = useMessageContext();

	if (chats.length === 0) {
		return (
			<VStack textAlign="center" my={8}>
				<TabPanels>
					<Text> Add a friend to start chatting</Text>
				</TabPanels>
			</VStack>
		);
	}

	return (
		<VStack justify="center" w="100%" my={8}>
			<TabPanels>
				{chats.map((chat) => (
					<TabPanel key={chat.id}>
						{chat.messages.map((message) => (
							<MessageBox key={message.id} message={message} />
						))}
					</TabPanel>
				))}
			</TabPanels>
		</VStack>
	);
}
