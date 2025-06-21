import { CreateClientScreen } from "@/modules/clients/presentation/screens/create-client.screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateClient() {
	return (
		<SafeAreaView className="flex-1 mt-3">
			<CreateClientScreen />
		</SafeAreaView>
	);
}
