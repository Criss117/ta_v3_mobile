import "@/global.css";
import { useEffect, useLayoutEffect } from "react";
import { Toaster } from "sonner-native";
import { PortalHost } from "@rn-primitives/portal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Appearance, Platform, View } from "react-native";
import { useColorScheme } from "@/lib/useColorScheme";
import { ThemeToggle } from "@/components/ThemeToggle";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { Integrations } from "@/integrations";
import { DEFAULT_THEME } from "@/lib/constants";
import { authClient } from "@/integrations/auth";
import { useAuth } from "@/modules/auth/application/store/auth.store";
import { Text } from "@/components/ui/text";

const LIGHT_THEME = {
	...DefaultTheme,
	colors: DEFAULT_THEME.light,
};
const DARK_THEME = {
	...DarkTheme,
	colors: DEFAULT_THEME.dark,
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
	web: useSetWebBackgroundClassName,
	android: useSetAndroidNavigationBar,
	default: () => {},
});

export default function RootLayout() {
	usePlatformSpecificSetup();
	const { isDarkColorScheme } = useColorScheme();
	const { data, isPending } = authClient.useSession();
	const setUser = useAuth((s) => s.setUser);

	useEffect(() => {
		if (!isPending && data?.user) {
			setUser(data.user);
		}
	}, [isPending, data?.user, setUser]);

	if (isPending) {
		return (
			<View className="flex-1 justify-center items-center bg-muted">
				<Text className="text-4xl font-bold text-primary">Nimbly</Text>
				<ActivityIndicator size="large" color="white" />
			</View>
		);
	}

	return (
		<Integrations>
			<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<SafeAreaProvider>
						<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
						<Stack
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Protected guard={data?.user === undefined}>
								<Stack.Screen
									name="auth/sign-in"
									options={{
										title: "Iniciar Sesión",
										headerRight: () => <ThemeToggle />,
									}}
								/>
							</Stack.Protected>
							<Stack.Protected guard={data?.user !== undefined}>
								<Stack.Screen
									name="dashboard"
									options={{
										headerShown: false,
									}}
								/>
							</Stack.Protected>
						</Stack>
						<PortalHost />
						<Toaster />
					</SafeAreaProvider>
				</GestureHandlerRootView>
			</ThemeProvider>
		</Integrations>
	);
}

const useIsomorphicLayoutEffect =
	Platform.OS === "web" && typeof window === "undefined"
		? useEffect
		: useLayoutEffect;

function useSetWebBackgroundClassName() {
	useIsomorphicLayoutEffect(() => {
		// Adds the background color to the html element to prevent white background on overscroll.
		document.documentElement.classList.add("bg-background");
	}, []);
}

function useSetAndroidNavigationBar() {
	useLayoutEffect(() => {
		setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
	}, []);
}
