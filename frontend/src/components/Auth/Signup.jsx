import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import { ArrowBackIcon } from "@chakra-ui/icons";
import api from "../../api";

const SignupSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.min(5, "Min 5 characters")
		.max(30, "Max 30 characters")
		.required("Required"),
	name: Yup.string()
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
	const { setUser } = useAccountContext();

	const formikProps = {
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: SignupSchema,
		onSubmit: async (values, { resetForm }) => {
			const response = await api.post("/auth/register", values);

			if (response.status === 201) {
				resetForm();
				setUser(response.data);
				navigate("/chat");
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
				<Heading>Sign Up</Heading>
				<TextField name="name" autoComplete="off" label="Name" />
				<TextField name="email" autoComplete="off" label="Email" />
				<TextField
					name="password"
					autoComplete="new-password"
					type="password"
					label="Password"
				/>

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
