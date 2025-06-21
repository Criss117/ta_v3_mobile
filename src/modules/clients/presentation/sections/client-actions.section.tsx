import {
	BanknoteArrowUpIcon,
	BanknoteXIcon,
	HandCoins,
} from "lucide-react-native";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export function ClientActionsSection() {
	return (
		<View className="flex-1 pt-5 px-5 gap-y-1.5">
			<Card className="rounded-sm">
				<CardHeader>
					<CardTitle>Acciones</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="gap-y-2">
					<View className="flex-row gap-x-2">
						<Button className="flex-1 rounded-sm flex-row gap-x-1 items-center">
							<HandCoins />
							<Text>Lista de pagos</Text>
						</Button>
						<Button className="flex-1 rounded-sm flex-row gap-x-1 items-center">
							<BanknoteArrowUpIcon />
							<Text>Abonar</Text>
						</Button>
					</View>
					<Button className="flex-1 rounded-sm flex-row gap-x-1 items-center">
						<BanknoteXIcon />
						<Text>Liquiadar adeudo</Text>
					</Button>
				</CardContent>
			</Card>
		</View>
	);
}
