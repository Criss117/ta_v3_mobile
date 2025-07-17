import { Suspense, use, useEffect } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import syncProductsDB from "@/modules/products/application/db/sync-products";
import { useNetInfo } from "@/integrations/netinfo";

function findAllCategories() {
	return syncProductsDB.findAllCategories();
}

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
