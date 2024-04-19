import { Button, HStack, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import socket from "../../socket";
import { useMessageContext } from "../../context/MessageContext";

export default function ChatBox({ userId }) {
	const { setMessages } = useMessageContext();

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
			<HStack as={Form} w="100%" py={4} px={8}>
				<Input
					as={Field}
					size="lg"
					name="message"
					_focusVisible="false"
					autoComplete="off"
					placeholder="Start typing your message..."
				/>

				{/* <BeatLoader size={8} color="white" /> */}

				<Button size="lg" colorScheme="teal" type="submit" name="submit">
					Send
				</Button>
			</HStack>
		</Formik>
	);
}
