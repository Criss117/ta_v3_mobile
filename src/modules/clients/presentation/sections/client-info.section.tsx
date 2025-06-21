import { View } from "react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import type { ClientDetail } from "@/modules/clients/application/models/entities";
import { useState } from "react";
import { ClientInfoCard } from "../components/client-info-card";
import {
	Calendar,
	Mail,
	MapPin,
	Phone,
	TrendingUp,
} from "@/components/icons/info.icons";
import { formatCurrency } from "@/lib/utils";
import { format } from "@formkit/tempo";
import { Skeleton } from "@/components/ui/skeleton";

type TabsScreen = "contact" | "pays" | "history";

interface Props {
	client: ClientDetail;
}

function modalityTranslation(value: ClientDetail["globalInstallmentModality"]) {
	switch (value) {
		case "biweekly":
			return "Bimestral";
		case "monthly":
			return "Mensual";
		case "weekly":
			return "Semanal";
		default:
			return "No definido";
	}
}

export function ClientInfoSection({ client }: Props) {
	const [value, setValue] = useState<TabsScreen>("contact");

	return (
		<Tabs
			value={value}
			onValueChange={(value) => setValue(value as TabsScreen)}
			className="flex-1 justify-center px-5 py-5 gap-y-1.5"
		>
			<TabsList className="w-full flex-row rounded-sm border border-border">
				<TabsTrigger value="contact" className="flex-1">
					<Text>Contacto</Text>
				</TabsTrigger>
				<TabsTrigger value="pays" className="flex-1">
					<Text>Pagos</Text>
				</TabsTrigger>
				<TabsTrigger value="history" className="flex-1">
					<Text>Historial</Text>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="contact">
				<ClientInfoCard title="Información de contacto">
					<View className="gap-y-2">
						<View className="flex-row gap-x-3 items-center">
							<Mail className="text-muted-foreground" />
							<View>
								<Text className="text-muted-foreground">Correo</Text>
								<Text className="font-semibold">{client.email ?? "-"}</Text>
							</View>
						</View>
						<View className="flex-row gap-x-3 items-center">
							<Phone className="text-muted-foreground" />
							<View>
								<Text className="text-muted-foreground">Teléfono</Text>
								<Text className="font-semibold">{client.phone ?? "-"}</Text>
							</View>
						</View>
						<View className="flex-row gap-x-3 items-center">
							<MapPin className="text-muted-foreground" />
							<View>
								<Text className="text-muted-foreground">Dirección</Text>
								<Text className="font-semibold">{client.address ?? "-"}</Text>
							</View>
						</View>
					</View>
				</ClientInfoCard>
			</TabsContent>
			<TabsContent value="pays">
				<ClientInfoCard title="Configuración de pagos">
					<View className="gap-x-2 flex-row justify-between">
						<View className="gap-y-2">
							<View>
								<Text className="text-muted-foreground">Límite de crédito</Text>
								<Text className="font-semibold text-xl">
									${formatCurrency(client.creditLimit)}
								</Text>
							</View>
							<View>
								<Text className="text-muted-foreground">Número de cuotas</Text>
								<Text className="font-semibold text-xl">
									{client.globalNumberOfInstallments}
								</Text>
							</View>
						</View>
						<View className="gap-y-2">
							<View>
								<Text className="text-muted-foreground">Modalidad</Text>
								<Text className="font-semibold text-xl">
									{modalityTranslation(client.globalInstallmentModality)}
								</Text>
							</View>
							<View>
								<Text className="text-muted-foreground">
									Tickets Pendientes
								</Text>
								<Text className="font-semibold text-xl">
									{client.totalTicketsUnpaid}
								</Text>
							</View>
						</View>
					</View>
				</ClientInfoCard>
			</TabsContent>
			<TabsContent value="history">
				<ClientInfoCard title="Actividad reciente">
					<View className="gap-y-2">
						<View className="flex-row gap-x-3 items-center">
							<Calendar className="text-muted-foreground" />
							<View>
								<Text className="text-muted-foreground">Último ticket</Text>
								<Text className="font-semibold">
									{client.lastTicketDate
										? format({
												date: client.lastTicketDate,
												format: "long",
												locale: "es-ES",
											})
										: "No hay tickets recientes"}
								</Text>
							</View>
						</View>
						<View className="flex-row gap-x-3 items-center">
							<TrendingUp className="text-muted-foreground" />
							<View>
								<Text className="text-muted-foreground">Cliente desde</Text>
								<Text className="font-semibold">
									{format({
										date: client.createdAt,
										format: "long",
										locale: "es-ES",
									})}
								</Text>
							</View>
						</View>
					</View>
				</ClientInfoCard>
			</TabsContent>
		</Tabs>
	);
}

export function ClientInfoSectionSkeleton() {
	return (
		<Tabs
			value="contact"
			onValueChange={() => {}}
			className="flex-1 justify-center px-5 py-5 gap-y-1.5"
		>
			<TabsList className="w-full flex-row rounded-sm border border-border">
				<TabsTrigger value="contact" className="flex-1" disabled>
					<Text>Contacto</Text>
				</TabsTrigger>
				<TabsTrigger value="pays" className="flex-1" disabled>
					<Text>Pagos</Text>
				</TabsTrigger>
				<TabsTrigger value="history" className="flex-1" disabled>
					<Text>Historial</Text>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="contact">
				<ClientInfoCard title="Información de contacto">
					<View className="gap-y-2">
						<View className="flex-row gap-x-3 items-center">
							<Mail className="text-muted-foreground" />
							<View className="flex-1">
								<Text className="text-muted-foreground">Correo</Text>
								<Skeleton className="h-3 w-2/3" />
							</View>
						</View>
						<View className="flex-row gap-x-3 items-center">
							<Phone className="text-muted-foreground" />
							<View className="flex-1">
								<Text className="text-muted-foreground">Teléfono</Text>
								<Skeleton className="h-3 w-2/3" />
							</View>
						</View>
						<View className="flex-row gap-x-3 items-center">
							<MapPin className="text-muted-foreground" />
							<View className="flex-1">
								<Text className="text-muted-foreground">Dirección</Text>
								<Skeleton className="h-3 w-2/3" />
							</View>
						</View>
					</View>
				</ClientInfoCard>
			</TabsContent>
		</Tabs>
	);
}
