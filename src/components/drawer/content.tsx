import {
	DrawerItemList,
	type DrawerContentComponentProps,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut } from "@/components/icons/action-icons";
import { useAuth } from "@/modules/auth/application/store/auth.store";
import { Button } from "../ui/button";

export function DrawerContent(props: DrawerContentComponentProps) {
	const router = useRouter();
	const user = useAuth((s) => s.user);
	const signOut = useAuth((s) => s.signOut);

	if (!user) {
		return null;
	}

	const handleSignOut = async () => {
		signOut();

		router.navigate("/auth/sign-in");
	};
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
							<Avatar className="rounded-md" alt={user.name}>
								{user.image && <AvatarImage src={user.image} />}
								<AvatarFallback className="rounded-lg">
									<Text>CN</Text>
								</AvatarFallback>
							</Avatar>
							<View className="text-left text-sm leading-tight">
								<Text className="truncate font-semibold">{user.name}</Text>
								<Text className="truncate text-xs">{user.email}</Text>
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
							<Avatar className="h-8 w-8 rounded-lg" alt={user.name}>
								{user.image && <AvatarImage src={user.image} />}
								<AvatarFallback className="rounded-lg">
									<Text>CN</Text>
								</AvatarFallback>
							</Avatar>
							<View className="grid flex-1 text-left text-sm leading-tight">
								<Text className="truncate font-semibold">{user.name}</Text>
								<Text className="truncate text-xs">{user.email}</Text>
							</View>
						</View>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />
					<DropdownMenuItem onPress={handleSignOut}>
						<LogOut className="dark:text-white" />
						<Text>Cerrar sesión</Text>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</DrawerContentScrollView>
	);
}
