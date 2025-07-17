import "@/global.css";
import { useLayoutEffect } from "react";
import { Stack } from "expo-router";
import { Toaster } from "sonner-native";
import { StatusBar } from "expo-status-bar";
import { Appearance, Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@drizzle/migrations";
import { useColorScheme } from "@/lib/useColorScheme";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { Integrations } from "@/integrations";
import { DEFAULT_THEME } from "@/lib/constants";
import { db } from "@/integrations/db";
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
	android: useSetAndroidNavigationBar,
	default: () => {},
});

export default function RootLayout() {
	usePlatformSpecificSetup();
	const { isDarkColorScheme } = useColorScheme();
	const { error } = useMigrations(db, migrations);

	if (error) {
		return <Text>Error al migrar la base de datos</Text>;
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
							<Stack.Screen
								name="dashboard"
								options={{
									headerShown: false,
								}}
							/>
						</Stack>
						<Toaster />
					</SafeAreaProvider>
				</GestureHandlerRootView>
			</ThemeProvider>
		</Integrations>
	);
}

function useSetAndroidNavigationBar() {
	useLayoutEffect(() => {
		setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
	}, []);
}
