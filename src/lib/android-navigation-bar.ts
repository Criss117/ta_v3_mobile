import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { DEFAULT_THEME } from "@/lib/constants";

export async function setAndroidNavigationBar(theme: "light" | "dark") {
	if (Platform.OS !== "android") return;
	await NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
	await NavigationBar.setBackgroundColorAsync(
		theme === "dark"
			? DEFAULT_THEME.dark.background
			: DEFAULT_THEME.light.background,
	);
}
