import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ColorModeToggle() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button pos="absolute" top={0} right={0} m={2} onClick={toggleColorMode}>
			{colorMode === "dark" ? (
				<SunIcon color="orange.300" />
			) : (
				<MoonIcon color="blue.700" />
			)}
		</Button>
	);
}
