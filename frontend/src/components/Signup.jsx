import { useNavigate } from "react-router-dom";
import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { ArrowBackIcon } from "@chakra-ui/icons";

const SignupSchema = Yup.object().shape({
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

export default function Signup() {
	const navigate = useNavigate();

	const formikProps = {
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: SignupSchema,
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
				w={{ base: "70vw", md: "500px" }}
			>
				<Heading>Sign Up</Heading>
				<TextField name="email" autoComplete="off" label="Email" />
				<TextField name="password" autoComplete="off" label="Password" />

				<ButtonGroup m={4}>
					<Button size="lg" colorScheme="teal" type="submit">
						Create Account
					</Button>
					<Button
						size="lg"
						onClick={() => navigate("/")}
						leftIcon={<ArrowBackIcon />}
					>
						Back to Login
					</Button>
				</ButtonGroup>
			</VStack>
		</Formik>
	);
}
