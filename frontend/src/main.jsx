import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { router } from "./routes.jsx";
import App from "./App.jsx";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<RouterProvider router={router}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<App />
			</RouterProvider>
		</ChakraProvider>
	</React.StrictMode>
);
