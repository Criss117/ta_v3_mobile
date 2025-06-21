import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { ProductForm } from "../components/product-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { View } from "react-native";
import { StackHeader } from "@/components/ui/stack-header";
import { useMutateProducts } from "@/modules/products/application/hooks/use.mutate-products";
import type { ProductSummary } from "@/modules/products/application/models/entities";

interface Props {
	product: Omit<ProductSummary, "barcode"> & { barcode: string };
}

export function UpdateProductScreen({ product }: Props) {
	const router = useRouter();
	const { update } = useMutateProducts();

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
						<ProductForm
							product={product}
							isPending={update.isPending}
							onSubmit={(data) =>
								update.mutate(
									{
										data,
										productId: product.id,
									},
									{
										onSuccess: () => router.navigate("/dashboard/products"),
									},
								)
							}
						/>
					</CardContent>
				</Card>
			</ScrollView>
		</View>
	);
}
