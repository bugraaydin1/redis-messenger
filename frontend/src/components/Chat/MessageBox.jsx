import {
	Card,
	CardBody,
	HStack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

export default function MessageBox({ message }) {
	const bg = useColorModeValue(
		message.isSender ? "teal.400" : "gray.100",
		message.isSender && "teal"
	);

	return (
		<HStack
			my={2}
			justifyContent={message.isSender ? "flex-end" : "flex-start"}
		>
			<Card w={2 / 5} bg={bg}>
				<CardBody>
					<Text>{message.text}</Text>
				</CardBody>
			</Card>
		</HStack>
	);
}
