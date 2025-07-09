import { toast } from "sonner-native";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";
import { useRefreshProductsData } from "./use.refresh-products-data";

export function useMutateProducts() {
	const trpc = useTRPC();
	const { refreshProductsPageData } = useRefreshProductsData();

	const create = useMutation(
		trpc.products.create.mutationOptions({
			onSuccess: () => {
				refreshProductsPageData();
				toast.success("Producto creado");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	const update = useMutation(
		trpc.products.update.mutationOptions({
			onMutate: () => {
				refreshProductsPageData();
				toast.loading("Actualizando producto", {
					id: "update_product",
				});
			},
			onSuccess: () => {
				toast.dismiss("update_product");
				toast.success("Producto actualizado");
			},
			onError: (error) => {
				toast.dismiss("update_product");
				toast.error(error.message);
			},
		}),
	);

	const deleteProduct = useMutation(
		trpc.products.delete.mutationOptions({
			onMutate: () => {
				refreshProductsPageData();
				toast.loading("Eliminando producto", {
					id: "delete_product",
				});
			},
			onSuccess: () => {
				toast.dismiss("delete_product");
				toast.success("Producto eliminado");
			},
			onError: (error) => {
				toast.dismiss("delete_product");
				toast.error(error.message);
			},
		}),
	);

	return {
		create,
		update,
		deleteProduct,
	};
}
