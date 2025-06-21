import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { StackHeader } from "@/components/ui/stack-header";
import { ClientForm } from "@/modules/clients/presentation/components/client-form";
import { useMutateClients } from "@/modules/clients/application/hooks/use.mutate-clients";

export function CreateClientScreen() {
	const { create } = useMutateClients();

	return (
		<View className="flex-1">
			<StackHeader title="Formulario de creación" />
			<ScrollView className="flex-1 mt-3 px-2 pb-52">
				<Card className="rounded-sm">
					<CardHeader>
						<CardTitle>Nuevo cliente</CardTitle>
						<CardDescription>
							LLena el formulario para crear un nuevo cliente
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ClientForm
							isPending={create.isPending}
							onSubmit={(data, { onSuccess }) => {
								create.mutate(data, {
									onSuccess,
								});
							}}
						/>
					</CardContent>
				</Card>
			</ScrollView>
		</View>
	);
}
