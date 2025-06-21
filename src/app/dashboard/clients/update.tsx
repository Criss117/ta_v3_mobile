import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ClientDetail } from "@/modules/clients/application/models/entities";
import UpdateClientScreen from "@/modules/clients/presentation/screens/update-client.screen";

export default function UpdateClientPage() {
	const { data } = useLocalSearchParams<{ data: string }>();
	const client = JSON.parse(data as string) as ClientDetail;

	return (
		<SafeAreaView className="flex-1 mt-3">
			<UpdateClientScreen client={client} />
		</SafeAreaView>
	);
}
