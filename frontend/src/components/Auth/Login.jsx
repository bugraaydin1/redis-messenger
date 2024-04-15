import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "../TextField";
import { LoginSchema } from "../../validations";
import api from "../../api";

export default function Login() {
	const navigate = useNavigate();
	const { setUser } = useAccountContext();

	const formikProps = {
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: async (values, { resetForm }) => {
			const response = await api.post("/auth/login", values);

			if (response.status === 200) {
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
