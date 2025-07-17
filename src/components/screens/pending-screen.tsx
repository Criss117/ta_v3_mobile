import { ActivityIndicator, View } from "react-native";
import { Text } from "../ui/text";

interface Props {
	description?: string;
}

export function PendingScreen({ description }: Props) {
	return (
		<View className="flex-1 items-center justify-center gap-y-5">
			<Text className="text-5xl font-bold text-primary leading-[50px]">
				Nimbly
			</Text>
			<ActivityIndicator size="large" color="primary" />
			{description && (
				<Text className="text-muted-foreground text-xl">{description}</Text>
			)}
		</View>
	);
}
