import { Circle, HStack, Tab, Text } from "@chakra-ui/react";

export default function ChatSnippet({ email, name }) {
	const isOnline = true;

	return (
		<HStack
			as={Tab}
			gap={4}
			p={3}
			w="100%"
			size="lg"
			textAlign="start"
			_selected={{ color: "white", bg: "teal" }}
		>
			<Circle bg={isOnline ? "green.400" : "red.700"} w="17px" h="17px" />
			<Text flex={1}>{name}</Text>
		</HStack>
	);
}
