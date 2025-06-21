import { TanstackQueryProvider } from "@/integrations/tanstack-query/provider";
import { TRPCProvider } from "@/integrations/trpc/provider";

export function Integrations({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TanstackQueryProvider>
				<TRPCProvider>{children}</TRPCProvider>
			</TanstackQueryProvider>
		</>
	);
}
