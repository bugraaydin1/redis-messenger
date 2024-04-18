import ColorModeToggle from "./components/ColorModeToggle";
import { AccountProvider } from "./context/AccountContext";
import { ColorModeScript } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import theme from "./theme";
import { FriendProvider } from "./context/FriendContext";

function Layout() {
	return (
		<AccountProvider>
			<FriendProvider>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<ColorModeToggle />
				<Outlet />
			</FriendProvider>
		</AccountProvider>
	);
}

export default Layout;
