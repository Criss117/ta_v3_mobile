import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";
import syncProductDb from "@/modules/products/application/db/sync-products";

export function useSyncProducts() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState(false);

	const syncProducts = () => {
		startTransition(async () => {
			const total = await syncProductDb.totalProducts();

			if (total.totalCategories > 0 && total.totalProducts > 0) {
				setSuccess(true);
				return;
			}

			const data = await queryClient.fetchQuery(
				trpc.products.findAll.queryOptions(),
			);

			await syncProductDb.populateProducts(data);
			setSuccess(true);
		});
	};

	return { syncProducts, isPending, success };
}
