import { useState } from "react";
import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import useSocketConnect from "../../hooks/useSocketConnect";

export default function Chat() {
	const [tabIndex, setTabIndex] = useState(0);

	useSocketConnect();

	return (
		<Grid
			as={Tabs}
			onChange={setTabIndex}
			variant="unstyled"
			templateColumns="repeat(10, 1fr)"
			h="100vh"
			w="100vw"
		>
			<GridItem colSpan={3} maxW="450px" borderRight="2px solid grey">
				<Sidebar />
			</GridItem>
			<GridItem colSpan={7} maxH="100vh">
				<Messages tabIndex={tabIndex} />
			</GridItem>
		</Grid>
	);
}
