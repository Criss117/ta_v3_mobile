import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ProductForm from "@/modules/products/presentation/components/product-form";
import { StackHeader } from "@/components/ui/stack-header";
import type { ProductSummary } from "@/modules/products/infrastructure/entities/product.entity";

interface Props {
	product: Omit<ProductSummary, "barcode"> & { barcode: string };
}

export function UpdateProductScreen({ product }: Props) {
	return (
		<View className="flex-1">
			<StackHeader title="Formulario de creación" />
			<ScrollView className="flex-1 mt-3 px-2 pb-52">
				<Card className="rounded-sm">
					<CardHeader>
						<CardTitle>Crear un producto</CardTitle>
						<CardDescription>
							LLena el formulario para crear un nuevo producto
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ProductForm.Root action="update" product={product}>
							<View className="gap-y-6 mx-1 mb-5">
								<ProductForm.BarcodeInput />
								<ProductForm.Description />
								<View className="flex-row gap-x-2">
									<ProductForm.CostPrice />
									<ProductForm.SalePrice />
								</View>
								<ProductForm.WholesalePrice />
								<View className="flex-row gap-x-2">
									<ProductForm.Stock />
									<ProductForm.MinStock />
								</View>
								<ProductForm.Category />
							</View>
							<View className="mt-2 flex-row gap-x-2">
								<ProductForm.Submit />
							</View>
						</ProductForm.Root>
					</CardContent>
				</Card>
			</ScrollView>
		</View>
	);
}
