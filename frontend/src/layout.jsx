import ColorModeToggle from "./components/ColorModeToggle";
import { AccountProvider } from "./context/AccountContext";
import { ColorModeScript } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import theme from "./theme";

function Layout() {
	return (
		<AccountProvider>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<ColorModeToggle />
			<Outlet />
		</AccountProvider>
	);
}

export default Layout;
