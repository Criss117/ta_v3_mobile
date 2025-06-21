import { create } from "zustand";
import { authClient } from "@/integrations/auth";
import type { User } from "better-auth/types";
import type { BetterFetchError } from "better-auth/react";

interface SignInEmail {
	email: string;
	password: string;
	onSuccess?: (data: { user: User }) => void;
	onError?: (error: BetterFetchError & Record<string, unknown>) => void;
}

interface AuthStore {
	user: User | null;
	getUser: () => User | null;
	setUser: (user: User) => void;
	signOut: () => void;
	signInEmail: (data: SignInEmail) => Promise<void>;
}

export const useAuth = create<AuthStore>()((set, get) => ({
	user: null,
	getUser: () => get().user,
	setUser: (user) =>
		set({
			user,
		}),
	signOut: () => {
		authClient.signOut();
		set({
			user: null,
		});
	},
	signInEmail: async ({ email, password, onSuccess, onError }) => {
		await authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onSuccess: ({ data }) => {
					set({
						user: data.user,
					});
					onSuccess?.(data);
				},
				onError: ({ error }) => {
					onError?.(error);
				},
			},
		);
	},
}));
