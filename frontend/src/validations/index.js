import * as Yup from "yup";

const loginSchema = Yup.object().shape({
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

const friendSchema = Yup.object().shape({
	friendEmail: Yup.string()
		.email("Invalid email")
		.min(5, "Invalid email")
		.max(30, "Invalid email")
		.required("User email required"),
});

export { loginSchema, friendSchema };
