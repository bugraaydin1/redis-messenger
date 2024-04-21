import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useMessageContext } from "../../context/MessageContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import { TypingIndicator } from "../TypingIndicator";
import socket from "../../socket";

export default function ChatBox({ userId }) {
	const { setMessages } = useMessageContext();
	const { typingFriends } = useNotificationContext();

	const isTyping = typingFriends[userId];

	const handleTyping = () => {
		socket.emit("typing", {
			to: userId,
			status: true,
		});
	};

	let timeout;
	const handleTypingEnd = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			socket.emit("typing", {
				to: userId,
				status: false,
			});
		}, 3000);
	};

	return (
		<Formik
			initialValues={{ message: "" }}
			validationSchema={Yup.object().shape({
				message: Yup.string().min(1).max(255),
			})}
			onSubmit={(values, { resetForm }) => {
				const message = {
					to: userId,
					from: null,
					content: values.message,
				};

				setMessages((m) => [message, ...m]);
				socket.emit("dm", message);
				resetForm();
			}}
		>
			<VStack w="100%" mt={3} mb={4} px={8}>
				{isTyping && (
					<HStack w="100%" alignItems="left" mt={-10} px={4}>
						<TypingIndicator boxSize={8} />
					</HStack>
				)}
				<HStack as={Form} w="100%">
					<Input
						as={Field}
						size="lg"
						onKeyDown={handleTyping}
						onKeyUp={handleTypingEnd}
						name="message"
						_focusVisible="false"
						autoComplete="off"
						placeholder="Start typing your message..."
					/>

					<Button size="lg" colorScheme="teal" type="submit" name="submit">
						Send
					</Button>
				</HStack>
			</VStack>
		</Formik>
	);
}
