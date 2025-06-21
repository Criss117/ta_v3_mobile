import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "./button";
import { ArrowLeft } from "@/components/icons/action-icons";
import { Text } from "./text";
import { ThemeToggle } from "../ThemeToggle";

interface Props {
	title: string;
}

export function StackHeader({ title }: Props) {
	const router = useRouter();
	return (
		<View className="flex-row justify-between items-center py-2">
			<View className="flex-row gap-x-2 items-center">
				<Button variant="ghost" onPress={() => router.back()}>
					<ArrowLeft className="dark:text-white" />
				</Button>
				<Text className="text-xl font-bold">{title}</Text>
			</View>
			<ThemeToggle />
		</View>
	);
}
