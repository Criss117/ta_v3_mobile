import { View } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { format } from "@formkit/tempo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PencilIcon } from "@/components/icons/action-icons";
import { PayDebt } from "../components/pay-debt";
import { PaysList } from "../components/pays-list";
import { SettleDebt } from "../components/settle-debt";
import { Button } from "@/components/ui/button";
import type { ClientDetail } from "@/modules/clients/application/models/entities";

interface Props {
	client: ClientDetail;
}

export function ClientHeaderSection({ client }: Props) {
	const router = useRouter();
	return (
		<View className="flex-1 pt-5 px-5 gap-y-1.5">
			<Card className="rounded-sm">
				<CardHeader>
					<CardTitle>
						<View className="flex-row items-center gap-x-2">
							<Button
								size="icon"
								variant="ghost"
								onPress={() =>
									router.navigate({
										pathname: "/dashboard/clients/update",
										params: {
											data: JSON.stringify(client),
										},
									})
								}
							>
								<PencilIcon className="dark:text-white" />
							</Button>
							<Text className="text-3xl font-bold text-primary">
								{client.fullName}
							</Text>
						</View>
					</CardTitle>
				</CardHeader>
				<CardContent className="gap-y-3">
					<View>
						<Text className="text-muted-foreground">
							ID del cliente: {client.clientCode}
						</Text>
						<Text className="text-muted-foreground">
							Cliente desde{" "}
							{format({
								date: client.createdAt,
								format: "long",
								locale: "es-ES",
							})}
						</Text>
					</View>
					<View className="gap-y-1.5">
						<View className="flex-row gap-x-1.5">
							<View className="flex-1">
								<PaysList clientId={client.id} />
							</View>
							<View className="flex-1">
								<PayDebt clientId={client.id} hasDebt={client.totalDebt > 0} />
							</View>
						</View>
						<SettleDebt clientId={client.id} hasDebt={client.totalDebt > 0} />
					</View>
				</CardContent>
			</Card>
		</View>
	);
}

export function ClientHeaderSectionSkeleton() {
	return (
		<View className="flex-1 pt-5 px-5 gap-y-1.5">
			<Card className="rounded-sm">
				<CardHeader>
					<CardTitle>
						<Skeleton className="h-7 w-full" />
					</CardTitle>
				</CardHeader>
				<CardContent className="gap-y-1.5">
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-3/4" />
				</CardContent>
			</Card>
		</View>
	);
}
