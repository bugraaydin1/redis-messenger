import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import useSocketConnect from "../../hooks/useSocketConnect";
import { MessageProvider } from "../../context/MessageContext";

export default function Chat() {
	useSocketConnect();

	return (
		<MessageProvider>
			<Grid
				as={Tabs}
				variant="unstyled"
				templateColumns="repeat(10, 1fr)"
				h="100vh"
				w="100vw"
			>
				<GridItem colSpan={3} maxW="450px" borderRight="2px solid grey">
					<Sidebar />
				</GridItem>
				<GridItem colSpan={7}>
					<Messages />
				</GridItem>
			</Grid>
		</MessageProvider>
	);
}
