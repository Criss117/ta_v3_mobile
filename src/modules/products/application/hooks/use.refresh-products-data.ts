import { useTRPC } from "@/integrations/trpc";
import { useQueryClient } from "@tanstack/react-query";

export function useRefreshProductsData() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const refreshProductsPageData = () => {
		queryClient.invalidateQueries(trpc.products.findMany.infiniteQueryFilter());
	};

	return {
		refreshProductsPageData,
	};
}
