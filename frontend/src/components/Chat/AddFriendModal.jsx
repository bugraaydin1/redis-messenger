import {
	Button,
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
import { FriendSchema } from "../../validations";

export default function AddFriendModal({ isOpen, onClose }) {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent shadow="none">
					<ModalHeader>Add friend to chat!</ModalHeader>
					<ModalCloseButton />
					<Formik
						initialValues={{ friendName: "" }}
						validationSchema={FriendSchema}
						onSubmit={(values) => {
							console.log({ values });
							onClose();
						}}
					>
						<Form>
							<ModalBody>
								<TextField
									name="friendName"
									label="Friend's name"
									autoComplete="off"
									placeholder="Enter friend's username"
								/>
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
