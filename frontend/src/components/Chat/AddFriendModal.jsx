import { useState } from "react";
import {
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import TextField from "../TextField";
import { Form, Formik } from "formik";
import socket from "../../socket";
import { useFriendContext } from "../../context/FriendContext";
import { friendSchema } from "../../validations";

export default function AddFriendModal({ isOpen, onClose }) {
	const [error, setError] = useState("");

	const { setFriendList } = useFriendContext();

	const closeModal = () => {
		setError("");
		onClose();
	};

	return (
		<>
			<Modal isCentered isOpen={isOpen} onClose={closeModal}>
				<ModalOverlay />
				<ModalContent shadow="none">
					<ModalHeader>Add friend to chat!</ModalHeader>
					<ModalCloseButton />
					<Formik
						initialValues={{ friendEmail: "" }}
						validationSchema={friendSchema}
						onSubmit={(values) => {
							socket.emit(
								"add_friend",
								values.friendEmail,
								({ success, errorMsg }) => {
									console.log("socket cb:", { errorMsg, success });
									if (success) {
										setFriendList((f) => [{ email: values.friendEmail }, ...f]);
										return onClose();
									}

									setError(errorMsg);
								}
							);
						}}
					>
						<Form>
							<ModalBody>
								<TextField
									name="friendEmail"
									label="Friend's email"
									autoComplete="off"
									placeholder="Enter friend's email to start a chat"
								/>
								<Heading mt={2} size="sm" as="p" color="red.300">
									{error}
								</Heading>
							</ModalBody>

							<ModalFooter>
								<Button type="submit" colorScheme="teal">
									Submit
								</Button>
							</ModalFooter>
						</Form>
					</Formik>
				</ModalContent>
			</Modal>
		</>
	);
}
