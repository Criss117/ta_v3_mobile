import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { useTRPC } from "@/integrations/trpc";
import { useMutation } from "@tanstack/react-query";
import { useRefreshClientData } from "./use.refresh-client-data";

export function useMutateClients() {
	const trpc = useTRPC();
	const router = useRouter();
	const { refreshClientPageData } = useRefreshClientData();

	const create = useMutation(
		trpc.clients.createClient.mutationOptions({
			onMutate: () => {
				toast.loading("Creando cliente", {
					position: "top-center",
					id: "create-client",
				});
			},
			onSuccess: (data) => {
				toast.dismiss("create-client");
				toast.success("Cliente creado exitosamente", {
					position: "top-center",
				});
				router.push({
					pathname: "/dashboard/clients/[id]",
					params: { id: data.id },
				});
			},
			onError: () => {
				toast.dismiss("create-client");
				toast.error("Error al crear cliente", { position: "top-center" });
			},
		}),
	);

	const update = useMutation(
		trpc.clients.updateClient.mutationOptions({
			onMutate: () => {
				toast.loading("Actualizando cliente", {
					position: "top-center",
					id: "update-client",
				});
			},
			onSuccess: (_, variables) => {
				toast.dismiss("update-client");
				toast.success("Cliente actualizado exitosamente", {
					position: "top-center",
				});
				refreshClientPageData(variables.clientId);
				router.back();
			},
			onError: () => {
				toast.dismiss("update-client");
				toast.error("Error al actualizar cliente", { position: "top-center" });
			},
		}),
	);

	return {
		create,
		update,
	};
}
