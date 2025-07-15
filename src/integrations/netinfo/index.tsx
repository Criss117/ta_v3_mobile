import { createContext, useContext, useLayoutEffect, useState } from "react";
import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";

const NetInfoContext = createContext<NetInfoState | null>(null);

export function useNetInfo() {
	const context = useContext(NetInfoContext);

	if (!context) {
		throw new Error("useNetInfo must be used within a NetInfoProvider");
	}

	return context;
}

export function NetInfoProvider({ children }: { children: React.ReactNode }) {
	const [netInfo, setNetInfo] = useState<NetInfoState | null>(null);

	useLayoutEffect(() => {
		const unsubscribe = NetInfo.addEventListener(setNetInfo);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<NetInfoContext.Provider value={netInfo}>
			{children}
		</NetInfoContext.Provider>
	);
}
