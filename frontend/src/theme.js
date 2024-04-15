import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: true,
	},
	styles: {
		global: {
			body: {
				margin: 0,
				display: "flex",
				justifyContent: "center",
				placeItems: "center",
				minHeight: "100vh",
				minWidth: "100vw",
			},
		},
	},
});
