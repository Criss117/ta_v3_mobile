import { Suspense } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useNetInfo } from "@/integrations/netinfo";

function ShowAllProductsFromDb() {
	const { netInfo } = useNetInfo();

	return (
		<View className="flex-1">
			<Text>Network state</Text>
			<Text>{JSON.stringify(netInfo)}</Text>
		</View>
	);
}

export default function HomePage() {
	return (
		<View className="flex-1 mt-3">
			<Text>Dashboard</Text>
			<Suspense fallback={<Text>Cargando...</Text>}>
				<ShowAllProductsFromDb />
			</Suspense>
		</View>
	);
}
