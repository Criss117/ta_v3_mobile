import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";

export default function ClientsLayout() {
	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "slide_from_bottom",
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="[id]/index" />
				<Stack.Screen
					name="create"
					options={{
						animation: "slide_from_right",
					}}
				/>
				<Stack.Screen
					name="update"
					options={{
						animation: "slide_from_right",
					}}
				/>
			</Stack>
			<PortalHost />
		</>
	);
}
