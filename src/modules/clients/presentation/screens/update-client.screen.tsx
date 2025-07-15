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
import ClientForm from "@/modules/clients/presentation/components/client-form";
import type { ClientDetail } from "@/modules/clients/application/models/entities";

interface Props {
	client: ClientDetail;
}

export default function UpdateClientScreen({ client }: Props) {
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
						<ClientForm.Root action="update" client={client}>
							<View className="gap-y-6 mx-1 mb-5">
								<ClientForm.BarCode />
								<ClientForm.FullName />
								<ClientForm.Email />
								<ClientForm.Phone />
								<ClientForm.Address />
								<ClientForm.CreditLimit />
								<ClientForm.Modality />
								<ClientForm.NumberOfInstallments />
							</View>
							<View className="mt-2 flex-row gap-x-2">
								<ClientForm.Submit />
							</View>
						</ClientForm.Root>
					</CardContent>
				</Card>
			</ScrollView>
		</View>
	);
}
