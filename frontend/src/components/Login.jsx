import { useNavigate } from "react-router-dom";
import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";

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
		onSubmit: (values, { resetForm }) => {
			console.log(values);

			resetForm();
		},
	};

	return (
		<Formik {...formikProps}>
			<VStack
				as="form"
				m="auto"
				justify="center"
				h="100vh"
				w={{ base: "70vw", md: "550px" }}
			>
				<Heading>Log In</Heading>
				<TextField name="email" autoComplete="off" label="Email" />
				<TextField name="password" autoComplete="off" label="Password" />

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
