import {
	VStack,
	HStack,
	Heading,
	Divider,
	TabList,
	useDisclosure,
	IconButton,
} from "@chakra-ui/react";
import ChatSnippet from "./ChatSnippet";
import { ChatIcon } from "@chakra-ui/icons";
import { useMessageContext } from "../../context/MessageContext";
import AddFriendModal from "./AddFriendModal";

export default function Sidebar() {
	const { chats } = useMessageContext();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<VStack py="1.4rem">
				<HStack px={4} justify="space-between" w="100%">
					<Heading size="md">Add Friend</Heading>
					<IconButton isRound icon={<ChatIcon />} onClick={onOpen} />
				</HStack>
				<Divider />

				<VStack as={TabList} w="100%" gap={0}>
					{chats.map((chat) => (
						<ChatSnippet key={chat.id} {...chat} />
					))}
				</VStack>
			</VStack>
			<AddFriendModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</>
	);
}
