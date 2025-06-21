import { View } from "react-native";
import { DrawerTrigger } from "./drawer-trigger";
import { Text } from "./text";

interface Props {
	rightIcon?: React.ReactNode;
}

export function DrawerHeader({ rightIcon }: Props) {
	return (
		<View className="flex-row items-center justify-between">
			<View className="flex-1">
				<DrawerTrigger />
			</View>
			<View className="flex-1 items-center">
				<Text className="text-2xl font-semibold text-primary">Nimbly</Text>
			</View>

			{rightIcon ? (
				<View className="flex-1 items-end">{rightIcon}</View>
			) : (
				<View className="flex-1 items-center" />
			)}
		</View>
	);
}
