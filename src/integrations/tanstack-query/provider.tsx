import { QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { getQueryClient } from ".";

export function TanstackQueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryclient = getQueryClient();
	useReactQueryDevTools(queryclient);

	return (
		<QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
	);
}
