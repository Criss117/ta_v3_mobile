import { Drawer } from "expo-router/drawer";
import {
	LayoutDashboardIcon,
	ListIcon,
	Users2Icon,
} from "@/components/icons/dashboard.icons";
import { cn } from "@/lib/utils";
import { DrawerContent } from "@/components/drawer/content";

export default function DashboardLayout() {
	return (
		<Drawer
			drawerContent={DrawerContent}
			screenOptions={{
				drawerHideStatusBarOnOpen: true,
				headerShadowVisible: false,
				drawerItemStyle: {
					marginVertical: 5,
					borderRadius: 0,
				},
				headerShown: false,
			}}
		>
			<Drawer.Screen
				name="clients"
				options={{
					title: "Clientes",
					drawerIcon: ({ focused }) => (
						<Users2Icon
							className={cn(focused ? "text-primary" : "dark:text-white")}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="products"
				options={{
					title: "Productos",
					drawerIcon: ({ focused }) => (
						<ListIcon
							className={cn(focused ? "text-primary" : "dark:text-white")}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: true,
					drawerIcon: ({ focused }) => (
						<LayoutDashboardIcon
							className={cn(focused ? "text-primary" : "dark:text-white")}
						/>
					),
				}}
			/>
		</Drawer>
	);
}
