import { useMutateProducts } from "@/modules/products/application/hooks/use.mutate-products";
import { ProductFormDialog } from "./product-form/dialog";
import type { ProductSummary } from "@/modules/products/application/models/entities";

interface Props {
	product: Omit<ProductSummary, "barcode"> & { barcode: string };
}

export function UpdateProduct({ product }: Props) {
	const { update } = useMutateProducts();
	return (
		<ProductFormDialog
			isPending={update.isPending}
			onSubmit={(data, onSuccess) =>
				update.mutate(
					{
						data,
						productId: product.id,
					},
					{
						onSuccess,
					},
				)
			}
			product={product}
		/>
	);
}
