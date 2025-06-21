import type { Theme } from "@react-navigation/native";

export interface APP_THEME {
	light: Theme["colors"];
	dark: Theme["colors"];
}

export const DEFAULT_THEME: APP_THEME = {
	light: {
		background: "hsl(223.81 173% 100%)",
		card: "hsl(223.81 173% 100%)",
		primary: "hsl(36.29 91% 54%)",
		border: "hsl(220.01 24% 92%)",
		notification: "hsl(359.91 86% 61%)",
		text: "hsl(223.81 0% 15%)",
	},
	dark: {
		background: "hsl(223.81 0% 9%)",
		card: "hsl(223.81 0% 15%)",
		primary: "hsl(36.29 91% 54%)",
		border: "hsl(223.81 0% 25%)",
		notification: "hsl(359.91 86% 61%)",
		text: "hsl(223.81 0% 90%)",
	},
};

export const COMPLETE_THEME = {
	light: {
		...DEFAULT_THEME.light,
		foreground: "hsl(223.81 0% 15%)",
		cardForeground: "hsl(223.81 0% 15%)",
		popover: "hsl(223.81 173% 100%)",
		popoverForeground: "hsl(223.81 0% 15%)",
		primaryForeground: "hsl(0 0% 0%)",
		secondary: "hsl(223.81 0% 96%)",
		secondaryForeground: "hsl(214.99 16% 35%)",
		muted: "hsl(223.81 0% 97%)",
		mutedForeground: "hsl(219.97 8% 46%)",
		accent: "hsl(50.01 100% 97%)",
		accentForeground: "hsl(22.04 77% 32%)",
		destructive: "hsl(359.91 86% 61%)",
		destructiveForeground: "hsl(223.81 173% 100%)",
		input: "hsl(220.01 24% 92%)",
		ring: "hsl(36.29 91% 54%)",
	},
	dark: {
		...DEFAULT_THEME.dark,
		foreground: "hsl(223.81 0% 90%)",
		cardForeground: "hsl(223.81 0% 90%)",
		popover: "hsl(223.81 0% 15%)",
		popoverForeground: "hsl(223.81 0% 90%)",
		primaryForeground: "hsl(0 0% 0%)",
		secondary: "hsl(223.81 0% 15%)",
		secondaryForeground: "hsl(223.81 0% 90%)",
		muted: "hsl(223.81 0% 15%)",
		mutedForeground: "hsl(223.81 0% 64%)",
		accent: "hsl(22.04 77% 32%)",
		accentForeground: "hsl(48.03 96% 75%)",
		destructive: "hsl(359.91 86% 61%)",
		destructiveForeground: "hsl(223.81 173% 100%)",
		input: "hsl(223.81 0% 25%)",
		ring: "hsl(36.29 91% 54%)",
	},
};
