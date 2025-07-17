import { useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { TRPCProvider as TProvider } from ".";
import type { AppRouter } from "./index.d.mts";
import { useQueryClient } from "@tanstack/react-query";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					transformer: superjson,
					url: `${process.env.EXPO_PUBLIC_API_URL}/api/trpc`,
					fetch(url, options) {
						const rOptions = options as RequestInit;

						return fetch(url, {
							// credentials: "include",
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
