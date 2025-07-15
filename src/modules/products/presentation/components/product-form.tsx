import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
	createProductDto,
	type CreateProductDto,
} from "@/modules/products/infrastructure/dtos/create-product.dto";
import type { ProductSummary } from "@/modules/products/infrastructure/entities/product.entity";
import { Form } from "@/components/ui/form";
import { ActivityIndicator, View } from "react-native";
import { FormInput } from "@/components/form/form-input";
import { DialogCamera } from "@/components/form/dialog-barcode-camera";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useMutateProducts } from "../../application/hooks/use.mutate-products";
import { useNetInfo } from "@/integrations/netinfo";
import { SelectCategory } from "./old-product-form/select-category";

interface RootProps {
	children: React.ReactNode;
	product?: Omit<ProductSummary, "barcode"> & { barcode: string };
	action: "create" | "update";
}

interface Context {
	form: UseFormReturn<CreateProductDto, unknown, CreateProductDto>;
	action: "create" | "update";
	isPending: boolean;
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
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

const ProductFormContext = createContext<Context | null>(null);

function useProductForm() {
	const context = use(ProductFormContext);

	if (!context) {
		throw new Error(
			"useProductForm must be used within a ProductFormContext.Provider",
		);
	}

	return context;
}

function Root({ children, product, action }: RootProps) {
	if (action === "update" && !product) {
		throw new Error("ProductForm.Root must have a product");
	}

	const netInfo = useNetInfo();
	const { create, update } = useMutateProducts();
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

	const onSubmit = form.handleSubmit(async (data) => {
		if (!netInfo.isConnected) {
			return;
		}

		if (action === "create") {
			create.mutate(
				{
					...data,
				},
				{
					onSuccess: () => {
						form.reset();
					},
				},
			);
		}

		if (action === "update" && product) {
			update.mutate(
				{
					productId: product.id,
					data,
				},
				{
					onSuccess: () => {
						form.reset();
					},
				},
			);
		}
	});

	return (
		<ProductFormContext.Provider
			value={{
				form,
				action,
				isPending: create.isPending || update.isPending,
				onSubmit,
			}}
		>
			<Form {...form}>{children}</Form>
		</ProductFormContext.Provider>
	);
}

function BarcodeInput() {
	const { form } = useProductForm();

	return (
		<View className="flex-row gap-x-2 items-center">
			<FormInput
				control={form.control}
				label="Código de barras"
				name="barcode"
				required
				itemClassName="flex-1"
			/>
			<DialogCamera
				onBarcodeScanned={({ raw }) => form.setValue("barcode", raw)}
			/>
		</View>
	);
}

function Submit() {
	const { action, isPending, onSubmit } = useProductForm();

	return (
		<Button className="w-full flex-1 flex-row gap-x-2" onPress={onSubmit}>
			{isPending && <ActivityIndicator size="small" color="black" />}
			<Text>{action === "update" ? "Editar" : "Agregar"}</Text>
		</Button>
	);
}

function Description() {
	const { form } = useProductForm();
	return (
		<FormInput
			label="Descripción"
			name="description"
			control={form.control}
			required
		/>
	);
}

function CostPrice() {
	const { form } = useProductForm();

	return (
		<FormInput
			label="Precio de compra"
			name="costPrice"
			control={form.control}
			keyboardType="numeric"
			itemClassName="flex-1"
			required
		/>
	);
}

function SalePrice() {
	const { form } = useProductForm();

	return (
		<FormInput
			label="Precio de venta"
			name="salePrice"
			control={form.control}
			keyboardType="numeric"
			itemClassName="flex-1"
			required
		/>
	);
}

function WholesalePrice() {
	const { form } = useProductForm();

	return (
		<FormInput
			label="Precio de mayoreo"
			name="wholesalePrice"
			control={form.control}
			keyboardType="numeric"
			required
		/>
	);
}

function Stock() {
	const { form } = useProductForm();

	return (
		<FormInput
			className="flex-1"
			label="Stock"
			name="stock"
			control={form.control}
			keyboardType="numeric"
			required
			itemClassName="flex-1"
		/>
	);
}

function MinStock() {
	const { form } = useProductForm();

	return (
		<FormInput
			className="flex-1"
			label="Stock mínimo"
			name="minStock"
			control={form.control}
			keyboardType="numeric"
			required
			itemClassName="flex-1"
		/>
	);
}

function Category() {
	const { form } = useProductForm();

	return <SelectCategory name="categoryId" control={form.control} />;
}

export default {
	useProductForm,
	Root,
	BarcodeInput,
	Submit,
	Description,
	CostPrice,
	SalePrice,
	WholesalePrice,
	Stock,
	MinStock,
	Category,
};
