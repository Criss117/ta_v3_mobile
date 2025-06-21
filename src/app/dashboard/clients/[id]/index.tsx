import { useLocalSearchParams } from "expo-router";
import { ClientScreen } from "@/modules/clients/presentation/screens/client.screen";

export default function ClientPage() {
	const { id } = useLocalSearchParams<{ id: string }>();

	return <ClientScreen clientId={id} />;
}
