import { toast } from "sonner-native";
import { useTRPC } from "@/integrations/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutatePayments() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const create = useMutation(
		trpc.payments.payDebt.mutationOptions({
			onMutate: () => {
				toast.loading("Creando pago...", {
					id: "pay-debt-mutation",
				});
			},
			onSuccess: (_, variables) => {
				toast.dismiss("pay-debt-mutation");
				toast.success("Pago creado exitosamente", {
					id: "pay-debt-mutation",
				});
				queryClient.invalidateQueries(
					trpc.clients.findOneBy.queryFilter({
						clientId: variables.clientId,
					}),
				);
				queryClient.invalidateQueries(
					trpc.tickets.findManyByClient.queryFilter({
						clientId: variables.clientId,
					}),
				);
				queryClient.invalidateQueries(
					trpc.payments.findManyByClient.queryFilter(),
				);
			},
			onError: () => {
				toast.dismiss("pay-debt-mutation");
				toast.error("Error al crear el pago");
			},
		}),
	);

	const deletePayments = useMutation(
		trpc.payments.deletePayments.mutationOptions({
			onMutate: ({ ids }) => {
				toast.loading(`Eliminando ${ids.length} pagos`, {
					id: "delete-payments",
				});
			},
			onSuccess: (_, variables) => {
				toast.dismiss("delete-payments");
				toast.success("Pagos eliminados");
				queryClient.invalidateQueries(
					trpc.clients.findOneBy.queryOptions({
						clientId: variables.clientId,
					}),
				);
				queryClient.invalidateQueries(
					trpc.tickets.findManyByClient.queryOptions({
						clientId: variables.clientId,
					}),
				);
				queryClient.invalidateQueries(
					trpc.payments.findManyByClient.infiniteQueryFilter(),
				);
			},
			onError: (err) => {
				toast.dismiss("delete-payments");
				toast.error(err.message);
			},
		}),
	);

	return {
		create,
		deletePayments,
	};
}
