import { useMemo } from "react";
import { useTRPC } from "@/integrations/trpc";
import { useNetInfo } from "@/integrations/netinfo";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useProductsQueryFilters } from "@/modules/products/application/context/products-query-filters.context";
import { findManyProductsUseCase } from "@/modules/products/container";

export function useFindManyProducts() {
	const trpc = useTRPC();
	const { limit, query: searchQuery } = useProductsQueryFilters();
	const netInfo = useNetInfo();

	const queryOptions = useMemo(() => {
		const options = trpc.products.findMany.infiniteQueryOptions(
			{
				limit,
				searchQuery,
				cursor: {
					lastId: null,
					createdAt: null,
				},
			},
			{
				getNextPageParam: (lastPage) =>
					lastPage.nextCursor.lastId ? lastPage.nextCursor : null,
			},
		);

		if (!netInfo.isConnected) {
			options.queryFn = ({ pageParam }) =>
				findManyProductsUseCase.execute({
					limit,
					searchQuery,
					cursor: pageParam ?? {
						lastId: null,
						createdAt: null,
					},
				});
		}

		return options;
	}, [netInfo.isConnected, limit, searchQuery]);

	const query = useSuspenseInfiniteQuery(queryOptions);

	return { ...query, limit, searchQuery };
}
