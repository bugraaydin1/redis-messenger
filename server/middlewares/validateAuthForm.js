import Yup, { ValidationError } from "yup";

const authSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.min(5, "Email min 5 characters")
		.max(30, "Email max 30 characters")
		.required("Email required"),
	name: Yup.string()
		.min(5, "Min 5 characters")
		.max(30, "Max 30 characters")
		.required("Name required"),
	password: Yup.string()
		.min(8, "Password min 8 characters")
		.max(30, "Password max 30 characters")
		.required("Password required"),
});

const validateAuthForm = async (req, res, next) => {
	const formData = req.body;

	const isLoginPath = req.path === "/login";
	const schema = isLoginPath ? { ...authSchema, name: null } : authSchema;

	try {
		await schema.validate(formData);
	} catch (error) {
		if (error instanceof ValidationError) {
			return res.status(422).json({
				message: "Validation failed",
				errors: error.errors,
			});
		}
	}
	next();
};

export default validateAuthForm;
