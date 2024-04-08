import { useNavigate } from "react-router-dom";
import {
	VStack,
	Button,
	ButtonGroup,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Heading,
} from "@chakra-ui/react";

export default function Login() {
	const navigate = useNavigate();

	return (
		<VStack
			as="form"
			w={{ base: "70vw", md: "500px" }}
			m="auto"
			justify="center"
			h="100vh"
		>
			<Heading>Log In</Heading>
			<FormControl>
				<FormLabel fontSize="large">Username</FormLabel>
				<Input name="username" />
				<FormErrorMessage>Invalid username</FormErrorMessage>
			</FormControl>
			<FormControl>
				<FormLabel fontSize="large">Password</FormLabel>
				<Input name="password" />
				<FormErrorMessage>Invalid password</FormErrorMessage>
			</FormControl>

			<ButtonGroup m={4}>
				<Button size="lg" colorScheme="teal" type="submit">
					Log In
				</Button>
				<Button size="lg" onClick={() => navigate("/register")}>
					Create Account
				</Button>
			</ButtonGroup>
		</VStack>
	);
}
