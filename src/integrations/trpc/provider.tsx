import { useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { getQueryClient } from "../tanstack-query";
import superjson from "superjson";
import { TRPCProvider as TProvider } from ".";
import type { AppRouter } from "./index.d.mts";
import { authClient } from "../auth";
import { useQueryClient } from "@tanstack/react-query";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					transformer: superjson,
					url: `${process.env.EXPO_PUBLIC_API_URL}/trpc`,
					headers() {
						const headers = new Map<string, string>();
						const cookies = authClient.getCookie();
						if (cookies) {
							headers.set("Cookie", cookies);
						}
						return Object.fromEntries(headers);
					},
					fetch(url, options) {
						const rOptions = options as RequestInit;

						return fetch(url, {
							credentials: "include",
							...rOptions,
						});
					},
				}),
			],
		}),
	);
	return (
		<TProvider trpcClient={trpcClient} queryClient={queryClient}>
			{children}
		</TProvider>
	);
}
