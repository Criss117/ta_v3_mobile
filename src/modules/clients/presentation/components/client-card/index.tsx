import { View, Button, TouchableOpacity } from "react-native";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { formatCurrency } from "@/lib/utils";
import type { ClientSummary } from "@/modules/clients/application/models/entities";
import { CreditCard, Mail, MapPin, Phone } from "@/components/icons/info.icons";
import { useRouter } from "expo-router";

interface Props {
	client: ClientSummary;
}

export function ClientCard({ client }: Props) {
	const router = useRouter();

	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: "/dashboard/clients/[id]",
					params: { id: client.id },
				})
			}
		>
			<Card className="rounded-sm">
				<CardHeader>
					<CardDescription>
						<Text className="text-muted-foreground text-sm">
							Código: {client.clientCode}
						</Text>
					</CardDescription>
					<CardTitle className="text-2xl text-primary">
						{client.fullName}
					</CardTitle>
				</CardHeader>
				<CardContent className="mt-5 gap-y-2">
					<View className="flex-row items-center gap-x-2">
						<Mail size={18} className="text-muted-foreground" />
						<Text className="text-muted-foreground">{client.email ?? "-"}</Text>
					</View>
					<View className="flex-row items-center gap-x-2">
						<Phone size={18} className="text-muted-foreground" />
						<Text className="text-muted-foreground">{client.phone ?? "-"}</Text>
					</View>
					<View className="flex-row items-center gap-x-2">
						<MapPin size={18} className="text-muted-foreground" />
						<Text className="text-muted-foreground">
							{client.address ?? "-"}
						</Text>
					</View>
					<Separator />
					<View className="flex-row items-center justify-between gap-x-2">
						<View className="flex-row items-center gap-x-2">
							<CreditCard size={18} className="text-muted-foreground" />
							<Text className="text-muted-foreground">Límite de crédito:</Text>
						</View>
						<Text className="font-semibold">
							{formatCurrency(client.creditLimit)}
						</Text>
					</View>
				</CardContent>
			</Card>
		</TouchableOpacity>
	);
}
