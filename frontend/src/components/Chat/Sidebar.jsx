import {
	VStack,
	HStack,
	Heading,
	Divider,
	TabList,
	useDisclosure,
	IconButton,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useFriendContext } from "../../context/FriendContext";
import AddFriendModal from "./AddFriendModal";
import ChatSnippet from "./ChatSnippet";

export default function Sidebar() {
	const { friendList } = useFriendContext();
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
					{friendList.map((friend) => (
						<ChatSnippet key={friend.email} {...friend} />
					))}
				</VStack>
			</VStack>
			<AddFriendModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</>
	);
}
