import { PendingScreen } from "@/components/screens/pending-screen";
import { useTRPC } from "@/integrations/trpc";
import { useQueryClient } from "@tanstack/react-query";
import syncProductDb from "@/modules/products/application/db/sync-products";
import {
	createContext,
	use,
	useLayoutEffect,
	useState,
	useTransition,
} from "react";
import { useNetInfo } from "@/integrations/netinfo";

interface Props {
	children: React.ReactNode;
}

interface Context {
	isSync: boolean;
}

const SyncProductsContext = createContext<Context | null>(null);

export function SyncProductsProvider({ children }: Props) {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const [isPending, startTransition] = useTransition();
	const [isSync, setIsSync] = useState(false);
	const { apiIsWorking, netInfo } = useNetInfo();

	useLayoutEffect(() => {
		startTransition(async () => {
			const total = await syncProductDb.totalProducts();

			if (total.totalCategories > 0 && total.totalProducts > 0) {
				setIsSync(true);
				console.log("no se ingresaron productos");
				return;
			}

			if (!netInfo?.isConnected || !apiIsWorking) {
				console.log("no hay conexion");
				setIsSync(true);
				return;
			}

			const data = await queryClient.fetchQuery(
				trpc.products.findAll.queryOptions(),
			);

			await syncProductDb.populateProducts(data);
			console.log("se ingresaron productos");
			setIsSync(true);
		});
	}, []);

	if (isPending) {
		return <PendingScreen description="Sincronizando Productos..." />;
	}

	return (
		<SyncProductsContext.Provider
			value={{
				isSync,
			}}
		>
			{children}
		</SyncProductsContext.Provider>
	);
}

export function useSyncProducts() {
	const context = use(SyncProductsContext);

	if (!context) {
		throw new Error(
			"useSyncProducts must be used within a SyncProductsContext.Provider",
		);
	}

	return context;
}
