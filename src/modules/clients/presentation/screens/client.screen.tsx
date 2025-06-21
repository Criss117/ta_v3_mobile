import { Suspense } from "react";
import { View } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTRPC } from "@/integrations/trpc";

import { Text } from "@/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { StackHeader } from "@/components/ui/stack-header";
import {
	ClientHeaderSection,
	ClientHeaderSectionSkeleton,
} from "../sections/client-header.section";
import {
	ClientCreditInfoSection,
	ClientCreditInfoSectionSkeleton,
} from "../sections/client-credit-info.section";
import {
	ClientInfoSection,
	ClientInfoSectionSkeleton,
} from "../sections/client-info.section";

interface Props {
	clientId: string;
}

export function ClientScreenSuspense({ clientId }: Props) {
	const trpc = useTRPC();
	const query = useSuspenseQuery(
		trpc.clients.findOneBy.queryOptions({
			clientId,
		}),
	);

	return (
		<ScrollView
			className="flex-1"
			refreshControl={
				<RefreshControl
					refreshing={query.isPending}
					onRefresh={() => {
						query.refetch();
					}}
				/>
			}
		>
			<ClientHeaderSection client={query.data} />
			<ClientCreditInfoSection client={query.data} />
			<ClientInfoSection client={query.data} />
		</ScrollView>
	);
}

function ClientScreenSkeleton() {
	return (
		<ScrollView className="flex-1">
			<ClientHeaderSectionSkeleton />
			<ClientCreditInfoSectionSkeleton />
			<ClientInfoSectionSkeleton />
		</ScrollView>
	);
}

export function ClientScreen(props: Props) {
	const { top } = useSafeAreaInsets();

	return (
		<View className="flex-1" style={{ paddingTop: top }}>
			<StackHeader title="Detalles del cliente" />
			<ErrorBoundary fallback={<Text>Something went wrong</Text>}>
				<Suspense fallback={<ClientScreenSkeleton />}>
					<ClientScreenSuspense {...props} />
				</Suspense>
			</ErrorBoundary>
		</View>
	);
}
