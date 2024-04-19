import {
	Card,
	CardBody,
	HStack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

export default function MessageBox({ isSender, content }) {
	const bg = useColorModeValue(
		isSender ? "teal.400" : "gray.100",
		isSender && "teal"
	);

	return (
		<HStack my={1} mx={4} justifyContent={isSender ? "flex-end" : "flex-start"}>
			<Card maxW="50%" px={1} size="sm" bg={bg}>
				<CardBody>
					<Text>{content}</Text>
				</CardBody>
			</Card>
		</HStack>
	);
}
