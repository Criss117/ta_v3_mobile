import { SafeAreaView } from "react-native-safe-area-context";
import { CreateProductScreen } from "@/modules/products/presentation/screens/create-product.screen";

export default function CreateProductPage() {
	return (
		<SafeAreaView className="flex-1 mt-3">
			<CreateProductScreen />
		</SafeAreaView>
	);
}
