import { toast } from "sonner-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";

export function useMutateProducts() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const create = useMutation(
		trpc.products.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.products.findMany.infiniteQueryFilter(),
				);
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
				toast.loading("Actualizando producto", {
					id: "update_product",
				});
			},
			onSuccess: () => {
				toast.dismiss("update_product");
				queryClient.invalidateQueries(
					trpc.products.findMany.infiniteQueryFilter(),
				);
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
				toast.loading("Eliminando producto", {
					id: "delete_product",
				});
			},
			onSuccess: () => {
				toast.dismiss("delete_product");
				queryClient.invalidateQueries(
					trpc.products.findMany.infiniteQueryFilter(),
				);
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
