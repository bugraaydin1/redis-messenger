import Yup, { ValidationError } from "yup";

const authSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.min(5, "Email min 5 characters")
		.max(30, "Email max 30 characters")
		.required("Email required"),
	password: Yup.string()
		.min(8, "Password min 8 characters")
		.max(30, "Password max 30 characters")
		.required("Password required"),
});

const validateAuth = async (req, res, next) => {
	const formData = req.body;

	try {
		await authSchema.validate(formData);
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

export default validateAuth;
