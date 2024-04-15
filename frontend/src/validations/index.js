import * as Yup from "yup";

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

const FriendSchema = Yup.object({
	friendName: Yup.string()
		.min(5, "Invalid username")
		.max(30, "Invalid username")
		.required("Username required"),
});

export { LoginSchema, FriendSchema };
