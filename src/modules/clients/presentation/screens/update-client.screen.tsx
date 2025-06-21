import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { StackHeader } from "@/components/ui/stack-header";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ClientForm } from "../components/client-form";
import { useMutateClients } from "@/modules/clients/application/hooks/use.mutate-clients";
import type { ClientDetail } from "@/modules/clients/application/models/entities";

interface Props {
	client: ClientDetail;
}

export default function UpdateClientScreen({ client }: Props) {
	const { update } = useMutateClients();

	return (
		<View className="flex-1">
			<StackHeader title="Formulario de creación" />
			<ScrollView className="flex-1 mt-3 px-2 pb-52">
				<Card className="rounded-sm">
					<CardHeader>
						<CardTitle>Editar cliente</CardTitle>
						<CardDescription>
							LLena el formulario para editar un cliente
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ClientForm
							client={client}
							isPending={update.isPending}
							onSubmit={(data, { onSuccess }) => {
								update.mutate(
									{
										clientId: client.id,
										...data,
									},
									{
										onSuccess,
									},
								);
							}}
						/>
					</CardContent>
				</Card>
			</ScrollView>
		</View>
	);
}
