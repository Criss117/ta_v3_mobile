import { View } from "react-native";
import { Text } from "@/components/ui/text";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVerticalIcon } from "@/components/icons/action-icons";
import { Separator } from "@/components/ui/separator";
import { BoxIcon } from "@/components/icons/info.icons";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
	return (
		<Card className="rounded-sm">
			<CardHeader>
				<View className="flex-row items-center justify-between">
					<Badge className="w-1/4" asChild>
						<Text className="text-center">-</Text>
					</Badge>
					<Button variant="ghost">
						<MoreVerticalIcon className="dark:text-white" size={20} />
					</Button>
				</View>
				<View className="mt-2 gap-y-2">
					<CardDescription>
						<Skeleton className="h-2 w-1/3" />
					</CardDescription>
					<CardTitle className="text-xl">
						<Skeleton className="h-3 w-3/4" />
					</CardTitle>
				</View>
			</CardHeader>
			<CardContent className="mt-5 gap-y-2">
				<View className="flex-row justify-between">
					<View className="flex-row gap-x-2 items-center">
						<BoxIcon size={18} className="dark:text-white" />
						<Text>Stock</Text>
					</View>
					<Skeleton className="h-3 w-1/4" />
				</View>
				<Separator />
				<View className="flex-row justify-between">
					<View>
						<Text className="text-muted-foreground text-sm">Precio Costo</Text>
						<Skeleton className="h-3 w-full" />
					</View>
					<View>
						<Text className="text-muted-foreground text-sm">
							Precio Mayoreo
						</Text>
						<Skeleton className="h-3 w-full" />
					</View>
				</View>
				<View>
					<Text className="text-muted-foreground text-sm">Precio de Venta</Text>
					<Skeleton className="h-3 w-1/3" />
				</View>
			</CardContent>
		</Card>
	);
}
