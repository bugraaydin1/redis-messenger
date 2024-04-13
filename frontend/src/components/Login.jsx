import { useNavigate } from "react-router-dom";
import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import api from "../api";

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.min(5, "Min 5 characters")
		.max(30, "Max 30 characters")
		.required("Required"),
	password: Yup.string()
		.min(8, "Min 8 characters")
		.max(30, "Max 30 characters")
		.required("Required"),
});

export default function Login() {
	const navigate = useNavigate();

	const formikProps = {
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: async (values, { resetForm }) => {
			const response = await api.post("/auth/login", values);

			if (response.status === 201) {
				resetForm();
			}
		},
	};

	return (
		<Formik {...formikProps}>
			<VStack
				as={Form}
				m="auto"
				justify="center"
				h="100vh"
				w={{ base: "70vw", md: "500px" }}
			>
				<Heading>Log In</Heading>
				<TextField name="email" autoComplete="off" label="Email" />
				<TextField
					name="password"
					type="password"
					autoComplete="new-password"
					label="Password"
				/>

				<ButtonGroup m={4}>
					<Button px={16} size="lg" colorScheme="teal" type="submit">
						Log In
					</Button>
					<Button size="lg" onClick={() => navigate("/register")}>
						Create Account?
					</Button>
				</ButtonGroup>
			</VStack>
		</Formik>
	);
}
