import { ClientsScreen } from "@/modules/clients/presentation/screens/clients.screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClientsPage() {
	return (
		<SafeAreaView className="flex-1 mt-3">
			<ClientsScreen />
		</SafeAreaView>
	);
}
