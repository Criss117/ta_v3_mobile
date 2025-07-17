import { TanstackQueryProvider } from "@/integrations/tanstack-query/provider";
import { TRPCProvider } from "@/integrations/trpc/provider";
import { NetInfoProvider } from "@/integrations/netinfo";
import { SyncProductsProvider } from "@/modules/products/application/context/sync-products.context";

export function Integrations({ children }: { children: React.ReactNode }) {
	return (
		<NetInfoProvider>
			<TanstackQueryProvider>
				<TRPCProvider>
					<SyncProductsProvider>{children}</SyncProductsProvider>
				</TRPCProvider>
			</TanstackQueryProvider>
		</NetInfoProvider>
	);
}
