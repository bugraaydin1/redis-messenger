import { Outlet } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";
import { AccountProvider } from "./context/AccountContext";
import { FriendProvider } from "./context/FriendContext";
import { MessageProvider } from "./context/MessageContext";
import { NotificationProvider } from "./context/NotificationContext";
import ColorModeToggle from "./components/ColorModeToggle";
import theme from "./theme";

function Layout() {
	return (
		<AccountProvider>
			<FriendProvider>
				<NotificationProvider>
					<MessageProvider>
						<ColorModeScript initialColorMode={theme.config.initialColorMode} />
						<ColorModeToggle />
						<Outlet />
					</MessageProvider>
				</NotificationProvider>
			</FriendProvider>
		</AccountProvider>
	);
}

export default Layout;
