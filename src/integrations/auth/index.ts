import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: `${process.env.EXPO_PUBLIC_API_URL}/auth`,
	fetchOptions: {
		credentials: "include", // This is crucial
	},
	plugins: [
		expoClient({
			scheme: "nimbly",
			storagePrefix: "nimbly",
			storage: SecureStore,
		}),
	],
});
