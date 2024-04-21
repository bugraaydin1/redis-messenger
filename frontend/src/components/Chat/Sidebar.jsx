import {
	Box,
	Spacer,
	Flex,
	HStack,
	Heading,
	Divider,
	TabList,
	IconButton,
	useDisclosure,
} from "@chakra-ui/react";
import { ChatIcon, LockIcon } from "@chakra-ui/icons";
import { useFriendContext } from "../../context/FriendContext";
import AddFriendModal from "./AddFriendModal";
import ChatSnippet from "./ChatSnippet";
import { useAccountContext } from "../../context/AccountContext";

export default function Sidebar() {
	const { friendList } = useFriendContext();
	const { user, logoutUser } = useAccountContext();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex direction="column" h="100vh">
			<Box>
				<HStack
					my={4}
					px={4}
					justify="space-between"
					alignContent="center"
					w="100%"
				>
					<Heading size="md">Add Friend</Heading>
					<IconButton isRound icon={<ChatIcon />} onClick={onOpen} />
				</HStack>
				<Divider />
			</Box>

			<Box as={TabList} flexDir="column" overflowY="auto">
				{friendList.map((friend) => (
					<ChatSnippet key={friend.email} {...friend} />
				))}
			</Box>

			<Spacer />

			<Box>
				<Divider />
				<HStack my={2} px={4} justify="space-between" w="100%">
					<Heading size="md">{user.name}</Heading>
					<IconButton isRound icon={<LockIcon />} onClick={logoutUser} />
				</HStack>
			</Box>
			<AddFriendModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</Flex>
	);
}
