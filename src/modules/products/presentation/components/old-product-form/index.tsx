import { ActivityIndicator, ScrollView, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createProductDto,
	type CreateProductDto,
} from "@/modules/products/infrastructure/dtos/create-product.dto";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { SelectCategory } from "./select-category";
import { BarcodeInput } from "./barcode-input";
import type { ProductSummary } from "@/modules/products/infrastructure/entities/product.entity";

interface Props {
	onSubmit: (data: CreateProductDto) => void;
	isPending: boolean;
	product?: Omit<ProductSummary, "barcode"> & { barcode: string };
}

const defaultValues: CreateProductDto = {
	barcode: "",
	description: "",
	costPrice: 0,
	salePrice: 0,
	wholesalePrice: 0,
	stock: 0,
	minStock: 0,
};

export function ProductForm({ onSubmit, isPending, product }: Props) {
	const form = useForm<CreateProductDto>({
		resolver: zodResolver(createProductDto),
		defaultValues: product
			? {
					barcode: product.barcode,
					description: product.description,
					costPrice: product.costPrice,
					salePrice: product.salePrice,
					wholesalePrice: product.wholesalePrice,
					stock: product.stock,
					minStock: product.minStock,
					categoryId: product.categoryId,
				}
			: defaultValues,
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		onSubmit(data);
	});

	return (
		<Form {...form}>
			<View className="gap-y-6 mx-1 mb-5">
				<BarcodeInput
					control={form.control}
					setValue={(value) => form.setValue("barcode", value)}
				/>
				<FormInput
					label="Descripción"
					name="description"
					control={form.control}
					required
				/>
				<View className="flex-row gap-x-2">
					<FormInput
						label="Precio de compra"
						name="costPrice"
						control={form.control}
						keyboardType="numeric"
						itemClassName="flex-1"
						required
					/>
					<FormInput
						label="Precio de venta"
						name="salePrice"
						control={form.control}
						keyboardType="numeric"
						itemClassName="flex-1"
						required
					/>
				</View>
				<FormInput
					label="Precio de mayoreo"
					name="wholesalePrice"
					control={form.control}
					keyboardType="numeric"
					required
				/>
				<View className="flex-row gap-x-2">
					<FormInput
						className="flex-1"
						label="Stock"
						name="stock"
						control={form.control}
						keyboardType="numeric"
						required
						itemClassName="flex-1"
					/>
					<FormInput
						className="flex-1"
						label="Stock mínimo"
						name="minStock"
						control={form.control}
						keyboardType="numeric"
						required
						itemClassName="flex-1"
					/>
				</View>
				<SelectCategory name="categoryId" control={form.control} />
			</View>
			<View className="mt-2 flex-row gap-x-2">
				<Button
					className="w-full flex-1 flex-row gap-x-2"
					onPress={handleSubmit}
				>
					{isPending && <ActivityIndicator size="small" color="black" />}
					<Text>{product ? "Editar" : "Agregar"}</Text>
				</Button>
			</View>
		</Form>
	);
}
