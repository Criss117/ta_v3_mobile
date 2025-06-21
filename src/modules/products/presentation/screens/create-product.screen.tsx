import { ProductForm } from "../components/product-form";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
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

export function CreateProductScreen() {
	const router = useRouter();
	const { create } = useMutateProducts();

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
							isPending={create.isPending}
							onSubmit={(data) =>
								create.mutate(data, {
									onSuccess: () => router.navigate("/dashboard/products"),
								})
							}
						/>
					</CardContent>
				</Card>
			</ScrollView>
		</View>
	);
}
