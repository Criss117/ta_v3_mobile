import { BarcodeCameraProvider } from "@/modules/products/presentation/components/barcode-camera";
import { Stack } from "expo-router";

export default function ProductsLayout() {
	return (
		<BarcodeCameraProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" />
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
		</BarcodeCameraProvider>
	);
}
