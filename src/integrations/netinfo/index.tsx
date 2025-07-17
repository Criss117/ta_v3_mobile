import { createContext, useContext, useLayoutEffect, useState } from "react";
import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";
import { PendingScreen } from "@/components/screens/pending-screen";

interface Context {
	netInfo: NetInfoState | null;
	apiIsWorking: boolean;
}

const NetInfoContext = createContext<Context | null>(null);

async function checkApiIsWorking() {
	const healthUrl = `${process.env.EXPO_PUBLIC_API_URL}/health`;

	const res = await fetch(healthUrl).then((response) => response.json());

	return res.status === "ok";
}

export function useNetInfo() {
	const context = useContext(NetInfoContext);

	if (!context) {
		throw new Error("useNetInfo must be used within a NetInfoProvider");
	}

	return context;
}

export function NetInfoProvider({ children }: { children: React.ReactNode }) {
	const [netInfo, setNetInfo] = useState<NetInfoState | null>(null);
	const [apiIsWorking, setApiIsWorking] = useState(false);
	const [isPending, setIsPending] = useState(true);

	useLayoutEffect(() => {
		NetInfo.fetch().then(async (res) => {
			if (!res.isConnected) {
				setApiIsWorking(false);
				return;
			}

			const apiIsWorking = await checkApiIsWorking();

			console.log({
				apiIsWorking,
			});

			setApiIsWorking(apiIsWorking);
			setIsPending(false);
		});
		const unsubscribe = NetInfo.addEventListener(setNetInfo);

		return () => {
			unsubscribe();
		};
	}, []);

	if (isPending) {
		return <PendingScreen description="Verificando conexión..." />;
	}

	return (
		<NetInfoContext.Provider
			value={{
				netInfo,
				apiIsWorking,
			}}
		>
			{children}
		</NetInfoContext.Provider>
	);
}
