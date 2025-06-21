import type { ClientDetail } from "@/modules/clients/application/models/entities";
import { View } from "react-native";
import { ClientInfoCard } from "../components/client-info-card";
import { Text } from "@/components/ui/text";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
	client: ClientDetail;
}

function progressColor(value: number) {
	switch (true) {
		case value > 80:
			return { bar: "bg-red-500/20", indicator: "bg-red-500" };
		case value > 50:
			return { bar: "bg-yellow-500/20", indicator: "bg-yellow-500" };
		default:
			return { bar: "bg-green-500/20", indicator: "bg-green-500" };
	}
}

export function ClientCreditInfoSection({ client }: Props) {
	const creditPercent = (client.totalDebt / client.creditLimit) * 100;
	const creditPercentClass = progressColor(creditPercent);

	return (
		<View className="flex-1 pt-5 px-5 gap-y-1.5">
			<ClientInfoCard title="Uso del Crédito" className="flex-1">
				<View className="flex-row justify-between">
					<Text className="text-muted-foreground">Límite de crédito</Text>
					<Text className="text-muted-foreground">
						${formatCurrency(client.creditLimit)}
					</Text>
				</View>
				<View className="flex-row justify-between">
					<Text className="text-xl font-semibold">Deuda actual</Text>
					<Text className="text-xl font-semibold">
						${formatCurrency(client.totalDebt)}
					</Text>
				</View>
				<View className="mt-2">
					<Progress
						value={creditPercent}
						className={creditPercentClass.bar}
						indicatorClassName={creditPercentClass.indicator}
					/>
				</View>
			</ClientInfoCard>
			<View className="flex-row justify-between gap-x-1.5">
				<ClientInfoCard title="Tickets Pagados" className="flex-1">
					<Text className="font-bold text-3xl">
						{client.totalTicketsPaid} / {client.totalTickets}
					</Text>
				</ClientInfoCard>
				<ClientInfoCard title="Cuotas Pendientes" className="flex-1">
					<Text className="font-bold text-3xl">{client.totalInstallments}</Text>
				</ClientInfoCard>
			</View>
		</View>
	);
}

export function ClientCreditInfoSectionSkeleton() {
	return (
		<View className="flex-1 pt-5 px-5 gap-y-1.5">
			<ClientInfoCard title="Uso del Crédito" className="flex-1">
				<View className="flex-row justify-between">
					<Text className="text-muted-foreground">Límite de crédito</Text>
					<Skeleton className="h-4 w-1/3" />
				</View>
				<View className="flex-row justify-between">
					<Text className="text-xl font-semibold">Deuda actual</Text>
					<Skeleton className="h-4 w-1/3" />
				</View>
				<View className="mt-2">
					<Skeleton className="h-4 rounded-full" />
				</View>
			</ClientInfoCard>
			<View className="flex-row justify-between gap-x-1.5">
				<ClientInfoCard title="Tickets Pagados" className="flex-1">
					<Skeleton className="h-8 w-1/2" />
				</ClientInfoCard>
				<ClientInfoCard title="Cuotas Pendientes" className="flex-1">
					<Skeleton className="h-8 w-1/2" />
				</ClientInfoCard>
			</View>
		</View>
	);
}
