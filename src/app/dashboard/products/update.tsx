import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { UpdateProductScreen } from "@/modules/products/presentation/screens/update-product.screen";
import type { ProductSummary } from "@/modules/products/application/models/entities";

export default function UpdateProductPage() {
	const { data } = useLocalSearchParams<{ data: string }>();
	const product = JSON.parse(data as string) as Omit<
		ProductSummary,
		"barcode"
	> & { barcode: string };

	return (
		<SafeAreaView className="flex-1 mt-3">
			<UpdateProductScreen product={product} />
		</SafeAreaView>
	);
}
