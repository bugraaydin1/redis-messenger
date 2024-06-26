import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

export default function TextField({ label, ...props }) {
	const [field, meta] = useField(props);

	return (
		<FormControl isInvalid={meta.touched && meta.error}>
			<FormLabel fontSize="large">{label}</FormLabel>
			<Input as={Field} {...field} {...props} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
}
