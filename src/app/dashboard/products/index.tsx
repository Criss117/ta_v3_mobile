import { SafeAreaView } from "react-native-safe-area-context";
import { ProductsScreen } from "@/modules/products/presentation/screens/products.screen";
import { useBarcodeCamera } from "@/modules/products/presentation/components/barcode-camera";

export default function ProductsPage() {
	return (
		<SafeAreaView className="flex-1 mt-3">
			<ProductsScreen />
		</SafeAreaView>
	);
}
