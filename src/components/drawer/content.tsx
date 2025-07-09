import {
	DrawerItemList,
	type DrawerContentComponentProps,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut } from "@/components/icons/action-icons";
import { Button } from "../ui/button";

export function DrawerContent(props: DrawerContentComponentProps) {
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={{
				flex: 1,
			}}
		>
			<View className="flex-1 ">
				<View>
					<View className="items-center my-5 ">
						<Text className="text-5xl font-bold text-primary leading-[50px]">
							Nimbly
						</Text>
					</View>
				</View>
				<DrawerItemList {...props} />
			</View>

			<DropdownMenu className="mb-5">
				<DropdownMenuTrigger asChild>
					<Button
						className="flex-row justify-between px-5"
						variant="ghost"
						size="lg"
					>
						<View className="flex-row items-center gap-x-2">
							<Avatar className="rounded-md" alt="a user">
								<AvatarFallback className="rounded-lg">
									<Text>CN</Text>
								</AvatarFallback>
							</Avatar>
							<View className="text-left text-sm leading-tight">
								<Text className="truncate font-semibold">Cristian</Text>
								<Text className="truncate text-xs">crviveros@gmail.com</Text>
							</View>
						</View>
						<ChevronsUpDown className="ml-auto size-4 dark:text-white" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-2/3 rounded-sm"
					align="start"
					side="top"
					sideOffset={4}
				>
					<DropdownMenuLabel className="p-0 flex-row">
						<View className="flex-row items-center gap-2 px-1 py-1.5 text-left text-sm">
							<Avatar className="h-8 w-8 rounded-lg" alt="a user">
								<AvatarFallback className="rounded-lg">
									<Text>CN</Text>
								</AvatarFallback>
							</Avatar>
							<View className="grid flex-1 text-left text-sm leading-tight">
								<Text className="truncate font-semibold">Cristian</Text>
								<Text className="truncate text-xs">crviveros@gmail.com</Text>
							</View>
						</View>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<LogOut className="dark:text-white" />
						<Text>Cerrar sesión</Text>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</DrawerContentScrollView>
	);
}
