import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { useTRPC } from "@/integrations/trpc";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { HandCoins } from "lucide-react-native";
import { Suspense, useMemo, useState } from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import {
	DeletePayments,
	PaysListCard,
	PaysListCheckProvider,
	usePaysListCheck,
} from "./card";
import { ErrorBoundary } from "react-error-boundary";
import { View } from "react-native";
import { useMutatePayments } from "@/modules/clients/application/hooks/use.mutate-payments";

interface Props {
	clientId: string;
}

function PaysListSuspense({ clientId }: Props) {
	const trpc = useTRPC();
	const query = useSuspenseInfiniteQuery(
		trpc.payments.findManyByClient.infiniteQueryOptions(
			{
				search: {
					limit: 10,
					clientId,
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

	const payments = useMemo(
		() => query.data?.pages.flatMap((page) => page.items),
		[query.data],
	);

	return (
		<FlatList
			className="max-h-96"
			data={payments}
			renderItem={({ item }) => <PaysListCard item={item} />}
			keyExtractor={(item) => item.id.toString()}
			ItemSeparatorComponent={() => <View className="h-5" />}
			refreshControl={
				<RefreshControl
					refreshing={query.isFetching}
					onRefresh={() => query.refetch()}
				/>
			}
			onEndReached={() => {
				if (query.isFetchingNextPage || !query.hasNextPage) return;
				query.fetchNextPage();
			}}
			ListEmptyComponent={
				<View className="flex-1 items-center justify-center">
					<Text>No hay pagos</Text>
				</View>
			}
		/>
	);
}

function PaysListContent({
	clientId,
	setIsOpen,
}: Props & { setIsOpen: (value: boolean) => void }) {
	const { checkedList } = usePaysListCheck();
	const { deletePayments } = useMutatePayments();

	const items = useMemo(() => Array.from(checkedList), [checkedList]);
	return (
		<>
			<DialogHeader>
				<DialogTitle>Lista de pagos</DialogTitle>
				<DialogDescription>
					Aquí podrás ver todas las operaciones realizadas por el cliente
				</DialogDescription>
			</DialogHeader>
			<ErrorBoundary fallback={<Text>Algo ha ido mal</Text>}>
				<Suspense fallback={<Text>cargando...</Text>}>
					<PaysListSuspense clientId={clientId} />
				</Suspense>
			</ErrorBoundary>
			<DialogFooter className="flex-row gap-x-2">
				<DialogClose asChild>
					<Button variant="outline" className="flex-1">
						<Text>Cancelar</Text>
					</Button>
				</DialogClose>
				<DeletePayments
					onPress={() => {
						deletePayments.mutate(
							{
								clientId,
								ids: items,
							},
							{
								onSuccess: () => {
									setIsOpen(false);
								},
							},
						);
					}}
				/>
			</DialogFooter>
		</>
	);
}

export function PaysList({ clientId }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="flex-1 rounded-sm flex-row gap-x-1 items-center">
					<HandCoins />
					<Text>Lista de pagos</Text>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<PaysListCheckProvider>
					<PaysListContent clientId={clientId} setIsOpen={setIsOpen} />
				</PaysListCheckProvider>
			</DialogContent>
		</Dialog>
	);
}
