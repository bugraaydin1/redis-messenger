import { useEffect, useRef } from "react";
import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useMessageContext } from "../../context/MessageContext";
import { useFriendContext } from "../../context/FriendContext";
import MessageBox from "./MessageBox";
import ChatBox from "./ChatBox";

export default function Messages({ tabIndex }) {
	const { friendList } = useFriendContext();
	const { messages } = useMessageContext();

	const bottomRef = useRef();
	const userId = friendList[tabIndex]?.userId;

	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, [messages]);

	if (friendList.length === 0) {
		return (
			<VStack textAlign="center" py={8}>
				<TabPanels>
					<Text> Add friends to start chatting</Text>
				</TabPanels>
			</VStack>
		);
	}

	return (
		<VStack justify="flex-end" h="100%">
			<TabPanels overflowX="hidden" overflowY="auto">
				{friendList.map((friend) => (
					<TabPanel key={friend.email} display="flex" flexDir="column-reverse">
						<div ref={bottomRef} />
						{messages
							.filter(
								(message) =>
									message.to === friend.userId || message.from === friend.userId
							)
							.map((message, idx) => (
								<MessageBox
									key={idx}
									content={message.content}
									isSender={message.to === friend.userId}
								/>
							))}
					</TabPanel>
				))}
			</TabPanels>
			<ChatBox userId={userId} />
		</VStack>
	);
}
