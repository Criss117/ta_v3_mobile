import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import ProductsQuery from "@/modules/products/application/context/products-query-filters.context";
import { BarcodeCameraProvider } from "@/modules/products/presentation/components/barcode-camera";

export default function ProductsLayout() {
	return (
		<ProductsQuery.Provider>
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
				<PortalHost />
			</BarcodeCameraProvider>
		</ProductsQuery.Provider>
	);
}
