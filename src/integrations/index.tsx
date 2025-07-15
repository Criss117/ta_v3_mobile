import { TanstackQueryProvider } from "@/integrations/tanstack-query/provider";
import { TRPCProvider } from "@/integrations/trpc/provider";
import { NetInfoProvider } from "@/integrations/netinfo";

export function Integrations({ children }: { children: React.ReactNode }) {
	return (
		<NetInfoProvider>
			<TanstackQueryProvider>
				<TRPCProvider>{children}</TRPCProvider>
			</TanstackQueryProvider>
		</NetInfoProvider>
	);
}
