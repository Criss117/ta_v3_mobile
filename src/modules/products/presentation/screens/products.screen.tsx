import { Suspense, useState } from "react";
import { View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";

import { Text } from "@/components/ui/text";
import { ProductCard } from "../components/product-card";
import { ProductCardSkeleton } from "../components/product-card/skeleton";
import { SearchBar } from "@/components/form/search-bar";
import { DrawerHeader } from "@/components/ui/drawer-header";
import { Link } from "expo-router";
import { Plus } from "lucide-react-native";
import { Button } from "@/components/ui/button";

interface Props {
	searchQuery: string;
}

function ProductsScreenSuspense({ searchQuery }: Props) {
	const trpc = useTRPC();
	const query = useSuspenseInfiniteQuery(
		trpc.products.findMany.infiniteQueryOptions(
			{
				search: {
					limit: 20,
					searchQuery,
				},
				cursor: {
					lastId: null,
					createdAt: null,
				},
			},
			{
				getNextPageParam: (lastPage) =>
					lastPage.nextCursor.lastId ? lastPage.nextCursor : null,
			},
		),
	);

	const products = query.data?.pages.flatMap((page) => page.items);

	return (
		<View className="flex-1 ">
			<FlatList
				data={products}
				ListEmptyComponent={<Text>No hay productos</Text>}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View className="h-5" />}
				renderItem={({ item }) => <ProductCard product={item} />}
				scrollIndicatorInsets={{ top: 0, left: 0, bottom: 0, right: 0 }}
				onEndReached={() => {
					if (query.isFetchingNextPage) return;
					query.fetchNextPage();
				}}
				className="mb-5 mt-2"
				refreshControl={
					<RefreshControl
						refreshing={query.isFetching}
						onRefresh={() => query.refetch()}
					/>
				}
			/>
		</View>
	);
}

export function ProductsScreenSkeleton() {
	const data = Array.from({ length: 3 }).map((_, i) => ({ id: i }));

	return (
		<View className="flex-1 ">
			<FlatList
				data={data}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View className="h-5" />}
				renderItem={() => <ProductCardSkeleton />}
				scrollIndicatorInsets={{ top: 0, left: 0, bottom: 0, right: 0 }}
				className="mb-5 mt-2"
			/>
		</View>
	);
}

export function ProductsScreen() {
	const [query, setQuery] = useState<string>("");

	return (
		<View className="flex-1">
			<View className="px-5 gap-y-5">
				<DrawerHeader
					rightIcon={
						<Link href={"/dashboard/products/create"} asChild>
							<Button size="icon">
								<Plus size={20} />
							</Button>
						</Link>
					}
				/>
				<SearchBar
					placeholder="Buscar productos"
					query={query}
					setQuery={setQuery}
				/>
			</View>
			<View className="mx-5 flex-1">
				<ErrorBoundary fallback={<Text>Algo ha ido mal</Text>}>
					<Suspense fallback={<ProductsScreenSkeleton />}>
						<ProductsScreenSuspense searchQuery={query} />
					</Suspense>
				</ErrorBoundary>
			</View>
		</View>
	);
}
