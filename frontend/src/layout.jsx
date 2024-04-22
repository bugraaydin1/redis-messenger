import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ColorModeScript, Spinner } from "@chakra-ui/react";
import { AccountProvider } from "./context/AccountContext";
import { FriendProvider } from "./context/FriendContext";
import { MessageProvider } from "./context/MessageContext";
import { NotificationProvider } from "./context/NotificationContext";
import ColorModeToggle from "./components/ColorModeToggle";
import theme from "./theme";

function Layout() {
	return (
		<Suspense fallback={<Spinner color="teal.500" boxSize={8} />}>
			<AccountProvider>
				<FriendProvider>
					<NotificationProvider>
						<MessageProvider>
							<ColorModeScript
								initialColorMode={theme.config.initialColorMode}
							/>
							<ColorModeToggle />
							<Outlet />
						</MessageProvider>
					</NotificationProvider>
				</FriendProvider>
			</AccountProvider>
		</Suspense>
	);
}

export default Layout;
