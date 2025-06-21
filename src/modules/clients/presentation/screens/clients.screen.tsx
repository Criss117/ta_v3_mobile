import { Suspense, useState } from "react";
import { View } from "react-native";
import { useTRPC } from "@/integrations/trpc";
import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

import { Text } from "@/components/ui/text";
import { SearchBar } from "@/components/form/search-bar";
import { ClientCard } from "../components/client-card";
import { Button } from "@/components/ui/button";
import { Plus } from "@/components/icons/action-icons";
import { DrawerHeader } from "@/components/ui/drawer-header";
import { Link } from "expo-router";

interface Props {
	searchQuery: string;
}

function ClientsScreenSuspense({ searchQuery }: Props) {
	const trpc = useTRPC();
	const query = useSuspenseInfiniteQuery(
		trpc.clients.findMany.infiniteQueryOptions(
			{
				search: {
					limit: 10,
					searchQuery,
				},
				cursor: {
					lastClientCode: null,
					createdAt: null,
				},
			},
			{
				getNextPageParam: (lastPage) =>
					lastPage.nextCursor.lastClientCode ? lastPage.nextCursor : null,
			},
		),
	);

	const clients = query.data?.pages.flatMap((page) => page.items);

	return (
		<View className="flex-1 ">
			<FlatList
				data={clients}
				ListEmptyComponent={<Text>No hay clientes</Text>}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View className="h-5" />}
				renderItem={({ item }) => <ClientCard client={item} />}
				scrollIndicatorInsets={{ top: 0, left: 0, bottom: 0, right: 0 }}
				onEndReached={() => {
					if (query.isFetchingNextPage || !query.hasNextPage) return;
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

export function ClientsScreen() {
	const [query, setQuery] = useState<string>("");
	return (
		<View className="flex-1">
			<View className="px-5 gap-y-5">
				<DrawerHeader
					rightIcon={
						<Link href="/dashboard/clients/create" asChild>
							<Button size="icon">
								<Plus />
							</Button>
						</Link>
					}
				/>
				<SearchBar
					placeholder="Buscar cliente"
					query={query}
					setQuery={setQuery}
				/>
			</View>
			<View className="mx-5 flex-1 mt-2">
				<ErrorBoundary fallback={<Text>Algo ha ido mal</Text>}>
					<Suspense fallback={<Text>cargando...</Text>}>
						<ClientsScreenSuspense searchQuery={query} />
					</Suspense>
				</ErrorBoundary>
			</View>
		</View>
	);
}
